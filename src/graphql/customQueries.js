export const searchPropertiesCustom = /* GraphQL */ `
  query SearchProperties(
    $filter: SearchablePropertiesFilterInput
    $sort: [SearchablePropertiesSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchablePropertiesAggregationInput]
  ) {
    searchProperties(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        COUNTRY
        NAME_1
        LAD21NM
        NAME_3
        geoLocationID
        geoLocation {
          id
          geometryID
          geometry {
          id
          geoShapeType
          coordinates
          geoLocationID
        }
          propertiesID
        }
        id
      }
      nextToken
      total
    }
  }
`;

export const searchPropertiesCustomForCoordinates = /* GraphQL */ `
  query SearchProperties(
    $filter: SearchablePropertiesFilterInput
    $sort: [SearchablePropertiesSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchablePropertiesAggregationInput]
  ) {
    searchProperties(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        COUNTRY
        NAME_1
        LAD21NM
        NAME_3
        geoLocationID
        geoLocation {
          id
          geometryID
          geometry {
          id
          geoShapeType
          coordinates
          geoLocationID
        }
          propertiesID
        }
        id
      }
      nextToken
      total
    }
  }
`;

export const listVenueCatalogsCustom = /* GraphQL */ `
  query ListVenueCatalogs(
    $filter: ModelVenueCatalogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVenueCatalogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        venuePrsetName
        isSelectable
        venueCatalogItems {
          items {
          id
          venueItemName
          isSelectable
          description
          thumbnail
          venueCatalogID
        }
        }
      }
      nextToken
    }
  }
`;

export const searchCampaignsCustom = /* GraphQL */ `
  query SearchCampaigns(
    $filter: SearchableCampaignFilterInput
    $sort: [SearchableCampaignSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCampaignAggregationInput]
  ) {
    searchCampaigns(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
        payingAmount
        isLaunched
        organization {
          id
          readGroups
          editGroups
          fullGroups
          photo
          organizationName
          rootID
          paymentMethodId
          stripeCustomerId
          country
          currency
          VATNumber
          billingLanguage
          companyName
          address
          postalCode
          city
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;

export const searchMediaContentsCustom = /* GraphQL */ `
  query SearchMediaContents(
    $filter: SearchableMediaContentFilterInput
    $sort: [SearchableMediaContentSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableMediaContentAggregationInput]
  ) {
    searchMediaContents(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        media
        mediaName
        organizationID
        contentType
        description
        organization {
          id
          readGroups
          editGroups
          fullGroups
          photo
          organizationName
          rootID
          paymentMethodId
          stripeCustomerId
          country
          currency
          VATNumber
          billingLanguage
          companyName
          address
          postalCode
          city
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
    }
  }
`;

export const organizationRolesByUserIDCustom = /* GraphQL */ `
  query OrganizationRolesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrganizationRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    organizationRolesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        user {
          id
          photo
          email
          firstName
          lastName
          phoneNumber
        }
        organizationID
        organization {
          id
          readGroups
          editGroups
          fullGroups
          photo
          organizationName
          rootID
          paymentMethodId
          stripeCustomerId
          payingAmount
          transactionDateTime
          paidByUserEmail
          paymentIntentId
          cardLastDigit
          accountHolderName
          cardCompanyName
          country
          currency
          VATNumber
          billingLanguage
          companyName
          address
          postalCode
          city
        }
        role
        isInvitedUser
        isActivated
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listMediaContentsCustom = /* GraphQL */ `
  query ListMediaContents(
    $filter: ModelMediaContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMediaContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        media
        mediaName
        organizationID
        contentType
        description
        organization {
          id
          photo
          organizationName
          paymentMethodId
          stripeCustomerId
          country
          currency
          VATNumber
          billingLanguage
          companyName
          address
          postalCode
          city
        }
      }
      nextToken
    }
  }
`;

export const listCampaignsCustom = /* GraphQL */ `
  query ListCampaigns(
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampaigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        CampaignName
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
        payingAmount
        isLaunched
        organization {
          id
          photo
          organizationName
          rootID
          paymentMethodId
          stripeCustomerId
          country
          currency
          VATNumber
          billingLanguage
          companyName
          address
          postalCode
          city
        }
      }
      nextToken
    }
  }
`;
