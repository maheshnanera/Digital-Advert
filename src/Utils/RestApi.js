import { post, get } from 'aws-amplify/api';

export const RESTPost = async (pathName, inputData) => post({ apiName: 'idaRestApi', path: pathName, options: { body: inputData } });

export const RESTGet = async (path) => get('idaRestApi', path);

export const RESTGetWithQueryString = async (path, queryStringObj) => get('idaRestApi', path, { queryStringParameters: queryStringObj });
