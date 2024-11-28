/* eslint-disable import/prefer-default-export */
export const updateCampaignCustom = /* GraphQL */ `
  mutation UpdateCampaign(
    $input: UpdateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    updateCampaign(input: $input, condition: $condition) {
      id
      CampaignName
      readGroups
      editGroups
      fullGroups
      targetCountry
      targetCities
      targetVenues
      targetServices
      targetMediaContents
      status
      startTime
      endTime
      brandName
      organizationID
    }
  }
`;
