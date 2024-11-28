/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import * as queriesdefault from '../graphql/queries';
import * as queriesCustom from '../graphql/customQueries';
import * as mutationsdefault from '../graphql/mutations';
import * as mutationsCustom from '../graphql/customMutation';
import config from '../amplifyconfiguration.json';

// Create Client to hit request
const client = generateClient();

const queries = { ...queriesdefault, ...queriesCustom };
const mutations = { ...mutationsdefault, ...mutationsCustom };

function fetchQueryName(query) {
  let customQueryName = query;
  if (String(query).endsWith('Custom')) {
    customQueryName = query.split('Custom')[0];
  }
  if (String(query).endsWith('ForCount')) {
    customQueryName = query.split('ForCount')[0];
  }
  return customQueryName;
}

// Global functions created to create functions dynamically and make it reusable
export const ExecuteQuery = (
  query,
  inputData,
  primarObj = {},
  filter,
  nextToken,
  limit,
) => ((input = inputData) => client.graphql({
  query: queries[query],
  variables: {
    input, filter, nextToken, ...primarObj, limit,
  },
}))()
  .then((res) => {
    query = fetchQueryName(query);
    return res?.data?.[query] || res;
  })
  .catch((err) => {
    console.log(err);
    return err;
  });

export const ExecuteMutation = async (query, inputData, filter) => {
  try {
    const result = await client.graphql({
      query: mutations[query],
      variables: { input: inputData, filter },
    });
    query = fetchQueryName(query);
    return result?.data?.[query] || result;
  } catch (error) {
    console.error('Error :', error);
    return null;
  }
};

/**
 * @returns
 */
export const ExecuteQueryCustom = async (
  query,
  input,
  id,
  filter,
  nextTokenParam,
  data,
  limit = 999,
  variables = {},
) => {
  let list = data || [];
  let nextToken = nextTokenParam;
  do {
    const res = await client.graphql({
      query: queries[query],
      variables: {
        input, filter, nextToken, id, limit, ...variables,
      },
    }).catch((e) => {
      console.log('Error:', e);
    });
    let customQueryName;
    if (String(query).endsWith('Custom')) {
      customQueryName = query.split('Custom')[0];
    }
    if (String(query).endsWith('ForCount')) {
      customQueryName = query.split('ForCount')[0];
    }
    nextToken = res?.data?.[customQueryName || query]?.nextToken;
    list = [...list, ...res?.data?.[customQueryName || query]?.items];
    if (!nextToken) {
      return list;
    }
  } while (nextToken);
};
