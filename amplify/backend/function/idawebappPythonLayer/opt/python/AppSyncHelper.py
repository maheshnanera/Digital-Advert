import os
import boto3
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
