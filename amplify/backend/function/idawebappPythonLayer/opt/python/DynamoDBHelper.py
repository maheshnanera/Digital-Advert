

import json
from decimal import Decimal
import uuid
from boto3.dynamodb.conditions import Key


def batch_delete(ddb_resource, table_name, input_array):
    print('received input:')
    print(input_array)
    # input_array = json.loads(json.dumps(input_array), parse_float=Decimal)

    print("table name", table_name)
    table = ddb_resource.Table(table_name)
    try:
        with table.batch_writer() as batch:
            for input in input_array:
                # input['id'] = str(uuid.uuid4())
                batch.delete_item(
                    Key=input
                )
    except Exception as e:
        print("error", e)
        return e
    return input_array


def batch_update(ddb_resource, table_name, input_array):
    print('received input:')
    print(input_array)
    input_array = json.loads(json.dumps(input_array), parse_float=Decimal)

    print("table name", table_name)
    table = ddb_resource.Table(table_name)
    try:
        with table.batch_writer() as batch:
            for input in input_array:
                # input['id'] = str(uuid.uuid4())
                batch.put_item(
                    Item=input
                )
    except Exception as e:
        print("error", e)
        return e
    return input_array


def batch_write(ddb_resource, table_name, input_array):
    print('received input:')
    print(input_array)
    input_array = json.loads(json.dumps(input_array), parse_float=Decimal)

    print("table name", table_name)
    table = ddb_resource.Table(table_name)
    try:
        with table.batch_writer() as batch:
            for input in input_array:
                if not input.get("id"):
                    input['id'] = str(uuid.uuid4())
                batch.put_item(
                    Item=input
                )
        print("input array::",input_array)
        return input_array
    except Exception as e:
        print("error", e)
        return e
    


def get(ddb_resource, table_name, key, select):
    print("received key:")
    print(key)

    print("table name", table_name)
    table = ddb_resource.Table(table_name)
    params = {'Key': key}
    try:
        if select:
            params['ProjectionExpression'] = ",".join(select)
        return table.get_item(
            **params
        )['Item']
    except Exception as e:
        print("error", e)
        return e


def batch_list(input_list, batch_size):
    return [input_list[i:i + batch_size] for i in range(0, len(input_list), batch_size)]


def batch_get(ddb_resource, table_name, keys, select):
    print('received input:')
    print(keys)
    items = []

    print("table name", table_name)
    table = ddb_resource.Table(table_name)
    for batch in batch_list(keys, 100):
        batch_keys = {
            table.name: {
                'Keys': batch
            }
        }
        if select:
            batch_keys[table.name]['ProjectionExpression'] = ",".join(select)
        try:
            items.extend(ddb_resource.batch_get_item(
                RequestItems=batch_keys)['Responses'][table.name])
        except Exception as e:
            print("error", e)
            return e
    return items


def query(table, index_name, key, select):
    print('received input:')
    print(key)
    items = []
    try:
        items.extend(table.query(
            IndexName=index_name,
            Select='ALL_ATTRIBUTES' if not select else 'SPECIFIC_ATTRIBUTES',
            ProjectionExpression=",".join(select),
            KeyConditionExpression=Key('id').eq(key)

        ))
    except Exception as e:
        print("error", e)
        return e
    return items
