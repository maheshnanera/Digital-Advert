const { executeQuery } = require('/opt/nodejs/appQueryHelper.js');
const queries = require('./graphql.js');

async function listOrganizationsByUserID(id, nextToken) {
  const organizations = await executeQuery(queries.organizationRolesByUserID, {
    userID: id,
    nextToken: nextToken,
  });
  if (organizations.errors) {
    return organizations;
  }
  return organizations.data.searchOrganizationRoles;
}

module.exports = {
  listOrganizationsByUserID,
};
