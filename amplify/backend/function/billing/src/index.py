import json
import stripe
import boto3
import os
from gql import gql
from datetime import datetime
from requests_aws4auth import AWS4Auth
from gql.client import Client
from gql.transport.requests import RequestsHTTPTransport

# Helper functions for querying AWS App Sync via GraphQL API
def create_graphql_client():
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
    }
    credentials = boto3.Session().get_credentials()
    service = "appsync"
    region = os.environ['REGION']
    awsauth = AWS4Auth(credentials.access_key, credentials.secret_key,
                       region, service, session_token=credentials.token)
    transport = RequestsHTTPTransport(url=os.environ['API_IDAWEBGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT'],
                                      headers=headers,
                                      auth=awsauth)
    client = Client(transport=transport,
                    fetch_schema_from_transport=True)
    return client


DYNAMODB_RESOURCE = boto3.resource('dynamodb')
stripe.api_key = "sk_test_51Mq9kCSHg6XeSvr690d64zpORZEsUSJuJSwm4ownWd13bU5CC5tvlV3aki5WxLOG2yPMyRXdH2mT2XeK4IgjLUnh00Z70ILtvH"
GQL_CLIENT = create_graphql_client()
RETURN_URL_MAPPER = {
    "dev" : "http://localhost:3001",
    "production": "https://app.idigitaladvert.com"
}


def handler(event, context):
    try:
        print('received event:')
        print(event)
        
        body = json.loads(event["body"])
        
        # Assertions to check required parameters
        assert "paying_amount" in body, "paying_amount is required"
        assert "campaign_id" in body, "campaign_id is required"
        assert "organization_id" in body, "organization_id is required"
        assert "payment_method_id" in body, "payment_method_id is required"
        assert "currency" in body, "currency is required"
        assert "customer_email" in body, "customer_email is required"
        assert "address" in body, "address is required"
        assert "postal_code" in body, "postal_code is required"
        assert "country" in body, "country is required"

        # GETTING DATA FROM BODY
        paying_amount = body["paying_amount"]
        campaign_id = body["campaign_id"]
        organization_id = body["organization_id"]
        payment_method_id = body["payment_method_id"]
        currency = body["currency"]
        customer_email = body["customer_email"]
        address = body["address"]
        postal_code = body["postal_code"]
        country= body["country"]
        stripe_customer_id = body["stripe_customer_id"]

        # stripe customer creation if stripe customer id is not exists with payment method id
        if not stripe_customer_id:
            customer_creation_response = stripe.Customer.create(
                name=customer_email.split('@')[0],
                email=customer_email,
                description=campaign_id,
                address={
                    "country": country,
                    "line1": address,
                    "postal_code": postal_code
                },
                payment_method=payment_method_id
            )
            stripe_customer_id = customer_creation_response.get("id")

            # Update Campaign with payment method id
            query = gql(
                """
                mutation UpdateOrganization($id:ID!, $stripeCustomerId: String){
                    updateOrganization(input: {id: $id, stripeCustomerId: $stripeCustomerId}) {
                        id
                        stripeCustomerId
                    }
                }
                """
            )
            params = {
                "id": organization_id,
                "stripeCustomerId": stripe_customer_id,
            }

            update_organization_response = GQL_CLIENT.execute(query, variable_values=params)
            print(update_organization_response)
    
        # Create a payment intent
        payment_intent_response = stripe.PaymentIntent.create(
            amount=paying_amount*100,
            currency=currency.lower(),
            automatic_payment_methods={"enabled": True},
            payment_method=payment_method_id,
            customer= stripe_customer_id,
            confirm=True,
            description="Confirmation for payment",
            return_url=f"{RETURN_URL_MAPPER.get(os.environ['ENV'])}/account/billing"
        )
        
        print("payment_intent_response::", payment_intent_response)
        print(payment_intent_response.get("client_secret"))


        # Update Campaign with payment method id, paid by user email, payment intent id
        query = gql(
            """
            mutation UpdateCampaign($id:ID!, $payingAmount: String, $paidByUserEmail: AWSEmail, $paymentIntentId: String){
                updateCampaign(input: {id: $id, payingAmount: $payingAmount, paidByUserEmail: $paidByUserEmail, paymentIntentId :$paymentIntentId}) {
                    id
                    payingAmount
                    paidByUserEmail
                    paymentIntentId
                }
            }
            """
        )
        params = {
            "id": campaign_id,
            "payingAmount": paying_amount, 
            "paidByUserEmail": customer_email,
            "paymentIntentId": payment_intent_response.get("id")
        }

        update_organization_response = GQL_CLIENT.execute(query, variable_values=params)
        print(update_organization_response)
        
        
        # RETURN client secret which Frontend will confirm
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({
                'client_secret': payment_intent_response.get("client_secret")
            })
        }
        
    except AssertionError as e:
        # Handle assertion errors
        print(f"Assertion error: {e}")
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'Assertion error': str(e)})
        }
        
    except Exception as e:
        # Handle general errors
        print(f"Exception Error: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'Exception error': str(e)})
        }
