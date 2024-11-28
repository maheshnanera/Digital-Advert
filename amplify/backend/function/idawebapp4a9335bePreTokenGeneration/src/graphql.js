const organizationRolesByUserID = `
  query searchOrganizationRoles($userID: ID!, $nextToken: String) {
    searchOrganizationRoles(filter: {userID: {eq: $userID}}, nextToken: $nextToken ) {
      items {
        organizationID
        role
        id
        userID
        isActivated
      }
      nextToken
    }
  }
`;
module.exports = {
  organizationRolesByUserID,
};
