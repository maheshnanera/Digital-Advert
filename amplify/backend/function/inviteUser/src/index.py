import json
import os
import boto3
import DynamoDBHelper
import CognitoUserHelper
from datetime import datetime

DYNAMODB_RESOURCE = boto3.resource('dynamodb')
SES_CLIENT = boto3.client('ses')
COGNITO_CLIENT = boto3.client('cognito-idp')
ORGANIZATION_TABLE = "Organization"+"-" + os.environ["API_IDAWEBGRAPHQL_GRAPHQLAPIIDOUTPUT"]+"-"+os.environ["ENV"]
ORGANIZATION_ROLE_TABLE = "OrganizationRole"+"-" + os.environ["API_IDAWEBGRAPHQL_GRAPHQLAPIIDOUTPUT"]+"-"+os.environ["ENV"]
USER_TABLE = "User"+"-" + os.environ["API_IDAWEBGRAPHQL_GRAPHQLAPIIDOUTPUT"]+"-"+os.environ["ENV"]
USERPOOL_ID = os.environ["AUTH_IDAWEBAPP4A9335BE_USERPOOLID"]
CURRENT_TIME = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'


def send_email(email, email_content, organization_name):
    send_email_response = SES_CLIENT.send_email(
        Destination={"ToAddresses": [email]},
        Message={
            "Body": {
                "Text": {
                    "Data": email_content,
                }
            },
            "Subject": {
                "Data": f"iDigital Advert - Invitation from {organization_name}",
            }
        },
        Source="aakashthelab@gmail.com"
    )
    print(send_email_response)

def handler(event, context):
    print(event)
    body = json.loads(event["body"])

    if not body["organizationName"] or not body["organizationID"] or not body["role"] or not body["email"]:
        return {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            "body": json.dumps("Invalid parameters have been passed!")
        }
    
    try:
    
        organization_name = body["organizationName"]
        organization_id = body["organizationID"]
        role =  body["role"]
        email = body["email"]
        is_invited_user = None

        # Check if user exists by email in cognito userpool
        invited_user_id = CognitoUserHelper.get_user_id_by_email(COGNITO_CLIENT, USERPOOL_ID, email)

        # if user is exists - send email 
        if invited_user_id:
            print(f"User exists with ID: {invited_user_id}")
            email_content = f"You're invited to join {organization_name}! \nGet ready to access exclusive resources and collaborate with organization."
            send_email(email, email_content, organization_name)

        # otherwise - create user & send email to that user with id & password
        else:
            # Create user if not exists and send email to send credentials
            invite_user_response = CognitoUserHelper.invite_user(COGNITO_CLIENT, USERPOOL_ID, email)
            invited_user_id = invite_user_response["user_id"]
            invited_user_pw = invite_user_response["password"]

            email_content = f"You are invited by {organization_name}. \nPlease login to URL with this credentials : \nEmail : {email} and Password: {invited_user_pw}."
            send_email(email, email_content, organization_name)

            user_data = {}
            user_data["createdAt"] = CURRENT_TIME
            user_data["updatedAt"] = CURRENT_TIME
            user_data["id"] = invited_user_id
            user_data["email"] = email
            user_data["__typename"] = "User"

            DynamoDBHelper.batch_write(DYNAMODB_RESOURCE, USER_TABLE, [user_data])[0]

        org_role_data = {}
        org_role_data["createdAt"] = CURRENT_TIME
        org_role_data["updatedAt"] = CURRENT_TIME
        org_role_data["isInvitedUser"] = is_invited_user
        org_role_data["userID"] = invited_user_id
        org_role_data["organizationID"] = organization_id
        org_role_data["isActivated"] = False  # user is not signed up that's why putted False here
        org_role_data["role"] = role
        org_role_data["__typename"] = "OrganizationRole"

        # create user role entry in orgnaization role dynamodb table
        DynamoDBHelper.batch_write(DYNAMODB_RESOURCE, ORGANIZATION_ROLE_TABLE, [org_role_data])[0]

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            "body": json.dumps("User successfully invited by sending an email.")
        }
    except Exception as error:
        print(error)
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            "body": json.dumps("An error occurred while processing the request.")
        }