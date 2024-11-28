import json
import AppSyncHelper
from gql import gql
from decimal import Decimal

GQL_CLIENT = AppSyncHelper.create_graphql_client()

def handler(event, context):
    try:
        print('received event:')
        print(event)
        
        body = json.loads(event["body"])  

        # Assertions to check required parameters
        assert "organization_id" in body, "organization_id is required"
        assert "target_cities" in body, "target_cities is required"

        # GETTING DATA FROM BODY
        organization_id = body["organization_id"]
        target_cities = body["target_cities"]

        assert len(target_cities) > 0, "target_cities should be greater than zero."

        # Get coordinates query
        query = get_coordinates_query(target_cities)
        params = {f'eq{i}': city for i, city in enumerate(target_cities)}
        get_coordinates_query_response = GQL_CLIENT.execute(query, variable_values=params)

        # Get media contents for aspect ratio
        query = get_media_contents_query()
        params = {"organizationID": organization_id}
        search_media_contents_response = GQL_CLIENT.execute(query, variable_values=params)

        # Get all device locations with lat and lon
        query = get_all_device_locations()
        params = {"limit": 999}
        get_all_device_locations_response = GQL_CLIENT.execute(query, variable_values=params)

        # List of media to hold compatible with devices
        compatible_media_list = []


        for media in search_media_contents_response['searchMediaContents']['items']:
            media_height = Decimal(media["mediaHeight"])
            media_width = Decimal(media["mediaWidth"])

            compatible_devices = []

            for device in get_all_device_locations_response['listScreenGeoLocations']['items']:
                x = device.get("lat")
                y = device.get("lng")

                inside = False
                for item in get_coordinates_query_response.get("searchProperties").get("items"):

                    polygon = item["geoLocation"]["geometry"]["coordinates"]
                    polygon = [json.loads(coord) if isinstance(coord, str) else coord for coord in polygon]

                    for i in range(len(polygon)):
                        j = (i - 1) % len(polygon)
                        xi, yi = float(polygon[i][1]), float(polygon[i][0])
                        xj, yj = float(polygon[j][1]), float(polygon[j][0])
                    
                        intersect = ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
                        if intersect:
                            inside = not inside

                            # if it is within the polygon then check aspects ratio of 
                            if inside:
                                device_height = Decimal(device["height"])
                                device_width = Decimal(device["width"])

                                if aspect_ratios_match(media_width, media_height, device_width, device_height):
                                    compatible_devices.append(device['id'])
                                    break

            if compatible_devices:
                compatible_media_list.append({
                    "id": media["id"],
                    "compatible_devices": compatible_devices,
                    "mediaHeight": media["mediaHeight"],
                    "mediaWidth": media["mediaWidth"],
                    "description": media["description"],
                    "contentType": media["contentType"],
                    "media": media["media"],
                    "mediaName": media["mediaName"],
                    "organizationID": media["organizationID"],
                    "videoDuration": media["videoDuration"]
                })

        print("Compatible Media List:", compatible_media_list)


        if len(compatible_media_list) > 0:
            # RETURN client secret which Frontend will confirm
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(compatible_media_list)
            }
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps("No any media is compitible with devices of your selected geo locations.")
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

def get_coordinates_query(target_cities):
    # Construct the filter conditions
    filter_or_conditions = ', '.join([f'{{id: {{eq: $eq{i}}}}}' for i in range(len(target_cities))])
    
    # Define the query with unique variables
    variables = ', '.join([f'$eq{i}: ID' for i in range(len(target_cities))])
    
    # Create the query string
    query_str = f"""
        query SearchProperties({variables}) {{
            searchProperties(filter: {{or: [{filter_or_conditions}]}}) {{
                items {{
                    id
                    geoLocation {{
                        geometry {{
                            coordinates
                            id
                        }}
                    }}
                }}
            }}
        }}
    """
    
    return gql(query_str)

def get_media_contents_query():
    query_str = """
        query searchMediaContents($organizationID: ID!) {
            searchMediaContents(filter: {organizationID: {eq: $organizationID}}) {
                items {
                    description
                    createdAt
                    contentType
                    media
                    id
                    mediaHeight
                    mediaName
                    mediaWidth
                    organizationID
                    updatedAt
                    videoDuration
                }
            }
        }
    """
    return gql(query_str)

def get_all_device_locations():
    query_str = """
        query listScreenGeoLocations($limit: Int) {
            listScreenGeoLocations(limit: $limit) {
                items {
                lat
                lng
                height
                id
                width
                }
            }
        }
    """
    return gql(query_str)
    
def calculate_aspect_ratio(width, height):
    return width / height

def aspect_ratios_match(media_width, media_height, screen_width, screen_height, tolerance=0.5):
    media_aspect_ratio = calculate_aspect_ratio(media_width, media_height)
    screen_aspect_ratio = calculate_aspect_ratio(screen_width, screen_height)
    return abs(media_aspect_ratio - screen_aspect_ratio) < tolerance