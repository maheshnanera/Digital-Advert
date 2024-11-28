/**
 * @type {import('@types/aws-lambda').PreTokenGenerationTriggerHandler}
 **/
const queries = require('./appQuery.js');

exports.handler = async (event) => {
  console.log('event in alter claims', event);
  const userId = event.request.userAttributes.sub;
  const groups = event.request.groupConfiguration.groupsToOverride;
  console.log(groups);

  try {
    if (
      event.triggerSource === 'TokenGeneration_RefreshTokens' ||
      event.triggerSource === 'TokenGeneration_Authentication' ||
      event.triggerSource === 'TokenGeneration_NewPasswordChallenge'
    ) {
      let organizationIds = [];
      let nextToken = null; // Declare nextToken with null

      // Query organizations at least once
      do {
        // Query organizations using nextToken if available
        const result = await queries.listOrganizationsByUserID(
          userId,
          nextToken
        );
        console.log(result);
        organizationIds.push(
          ...result.items.flatMap((item) => {
            if (item.role === 'OPERATOR' && item.isActivated) {
              return [
                `${item.organizationID}-read`,
                `${item.organizationID}-edit`,
              ];
            } else if (item.isActivated) {
              return `${item.organizationID}-full`;
            }
          })
        );
        nextToken = result.nextToken;
      } while (nextToken !== null); // Continue loop while nextToken is not null

      // Add all userpool groups to organizationIds
      organizationIds.push(...groups);

      console.log('All organization IDs:', organizationIds);

      // Set up claimsOverrideDetails
      event.response = {
        claimsOverrideDetails: {
          groupOverrideDetails: {
            groupsToOverride: organizationIds,
          },
        },
      };
      console.log('event response:', event.response);
      console.log(event);
    }
  } catch (error) {
    console.log('Error in pre token generation trigger:', error);
  }
  return event;
};
