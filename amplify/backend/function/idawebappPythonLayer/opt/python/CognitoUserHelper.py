import string
import random


def update_user_attributes(cognito_client, user_pool_id, username, user_attributes):
    try:
        return cognito_client.admin_update_user_attributes(
            UserPoolId=user_pool_id,
            Username=username,
            UserAttributes=user_attributes
        )
    except Exception as e:
        print("error", e)
        return e


def enable_user(cognito_client, user_pool_id, username):
    try:
        return cognito_client.admin_enable_user(
            UserPoolId=user_pool_id,
            Username=username
        )
    except Exception as e:
        print("error", e)
        return e


def disable_user(cognito_client, user_pool_id, username):
    try:
        return cognito_client.admin_disable_user(
            UserPoolId=user_pool_id,
            Username=username
        )
    except Exception as e:
        print("error", e)
        return e


def add_user_to_group(cognito_client, user_pool_id, username, group_name):
    try:
        return cognito_client.admin_add_user_to_group(
            UserPoolId=user_pool_id,
            Username=username,
            GroupName=group_name
        )
    except Exception as e:
        print("error", e)
        return e


def remove_user_from_group(cognito_client, user_pool_id, username, group_name):
    try:
        return cognito_client.admin_remove_user_from_group(
            UserPoolId=user_pool_id,
            Username=username,
            GroupName=group_name
        )
    except Exception as e:
        print("error", e)
        return e


def set_temporary_password(cognito_client, user_pool_id, username, password):
    try:
        return cognito_client.admin_set_user_password(
            UserPoolId=user_pool_id,
            Username=username,
            Password=password
        )
    except Exception as error:
        print("error", error)
        return error

def invite_user(cognito_client, userpool_id, email):
    ''' 
        Create user in cognito with temporary password 
        Send email invite with temporary password
    '''
    try:
        characters = string.ascii_letters + string.digits
        password = ''.join(random.choice(characters) for i in range(10))
        cognito_user_created = cognito_client.admin_create_user(
            UserPoolId=userpool_id,
            Username=email,
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': email
                },
                {
                    'Name': 'email_verified',
                    'Value': 'true'
                }
            ],
            TemporaryPassword=password,
            MessageAction='SUPPRESS',
            DesiredDeliveryMediums=[]
        )
        print("user created :: ", cognito_user_created)
        user_id = cognito_user_created['User']['Username']
        return {
            "user_id": user_id,
            "password": password
        }
    except Exception as error:
        print(error)


def get_user_id_by_email(cognito_client, user_pool_id, email):
    try:
        # Try to get user details by email
        response = cognito_client.admin_get_user(
            UserPoolId=user_pool_id,
            Username=email
        )
        # Extract user id from the response
        user_id = response['UserAttributes'][0]['Value']
        return user_id
    except cognito_client.exceptions.UserNotFoundException:
        # User does not exist, return None
        return None
    