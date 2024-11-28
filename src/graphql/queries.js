/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
      id
      readGroups
      editGroups
      fullGroups
      photo
      organizationName
      rootID
      rootUser {
        id
        photo
        email
        firstName
        lastName
        phoneNumber
        role {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      users {
        items {
          id
          userID
          organizationID
          role
          isInvitedUser
          isActivated
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      campaigns {
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
          paymentMethodId
          stripeCustomerId
          payingAmount
          transactionDateTime
          paidByUserEmail
          paymentIntentId
          currency
          isLaunched
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      mediaContent {
        items {
          id
          media
          mediaName
          mediaHeight
          videoDuration
          mediaWidth
          description
          contentType
          organizationID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        readGroups
        editGroups
        fullGroups
        photo
        organizationName
        rootID
        rootUser {
          id
          photo
          email
          firstName
          lastName
          phoneNumber
          createdAt
          updatedAt
          __typename
        }
        users {
          nextToken
          __typename
        }
        campaigns {
          nextToken
          __typename
        }
        mediaContent {
          nextToken
          __typename
        }
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      photo
      email
      firstName
      lastName
      phoneNumber
      role {
        items {
          id
          userID
          organizationID
          role
          isInvitedUser
          isActivated
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        photo
        email
        firstName
        lastName
        phoneNumber
        role {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        photo
        email
        firstName
        lastName
        phoneNumber
        role {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getMediaContent = /* GraphQL */ `
  query GetMediaContent($id: ID!) {
    getMediaContent(id: $id) {
      id
      media
      mediaName
      mediaHeight
      videoDuration
      mediaWidth
      description
      contentType
      organizationID
      organization {
        id
        readGroups
        editGroups
        fullGroups
        photo
        organizationName
        rootID
        rootUser {
          id
          photo
          email
          firstName
          lastName
          phoneNumber
          createdAt
          updatedAt
          __typename
        }
        users {
          nextToken
          __typename
        }
        campaigns {
          nextToken
          __typename
        }
        mediaContent {
          nextToken
          __typename
        }
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
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMediaContents = /* GraphQL */ `
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
        mediaHeight
        videoDuration
        mediaWidth
        description
        contentType
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const mediaContentsByOrganizationID = /* GraphQL */ `
  query MediaContentsByOrganizationID(
    $organizationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMediaContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mediaContentsByOrganizationID(
      organizationID: $organizationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        media
        mediaName
        mediaHeight
        videoDuration
        mediaWidth
        description
        contentType
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchMediaContents = /* GraphQL */ `
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
        mediaHeight
        videoDuration
        mediaWidth
        description
        contentType
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
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getOrganizationRole = /* GraphQL */ `
  query GetOrganizationRole($id: ID!) {
    getOrganizationRole(id: $id) {
      id
      userID
      user {
        id
        photo
        email
        firstName
        lastName
        phoneNumber
        role {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
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
        rootUser {
          id
          photo
          email
          firstName
          lastName
          phoneNumber
          createdAt
          updatedAt
          __typename
        }
        users {
          nextToken
          __typename
        }
        campaigns {
          nextToken
          __typename
        }
        mediaContent {
          nextToken
          __typename
        }
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
        createdAt
        updatedAt
        __typename
      }
      role
      isInvitedUser
      isActivated
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listOrganizationRoles = /* GraphQL */ `
  query ListOrganizationRoles(
    $filter: ModelOrganizationRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizationRoles(
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
          createdAt
          updatedAt
          __typename
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
          createdAt
          updatedAt
          __typename
        }
        role
        isInvitedUser
        isActivated
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const organizationRolesByUserID = /* GraphQL */ `
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
          createdAt
          updatedAt
          __typename
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
          createdAt
          updatedAt
          __typename
        }
        role
        isInvitedUser
        isActivated
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const organizationRolesByOrganizationID = /* GraphQL */ `
  query OrganizationRolesByOrganizationID(
    $organizationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrganizationRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    organizationRolesByOrganizationID(
      organizationID: $organizationID
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
          createdAt
          updatedAt
          __typename
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
          createdAt
          updatedAt
          __typename
        }
        role
        isInvitedUser
        isActivated
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchOrganizationRoles = /* GraphQL */ `
  query SearchOrganizationRoles(
    $filter: SearchableOrganizationRoleFilterInput
    $sort: [SearchableOrganizationRoleSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableOrganizationRoleAggregationInput]
  ) {
    searchOrganizationRoles(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
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
          createdAt
          updatedAt
          __typename
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
          createdAt
          updatedAt
          __typename
        }
        role
        isInvitedUser
        isActivated
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getGeoLocation = /* GraphQL */ `
  query GetGeoLocation($id: ID!) {
    getGeoLocation(id: $id) {
      id
      geometryID
      geometry {
        id
        geoShapeType
        coordinates
        geoLocationID
        geoLocation {
          id
          geometryID
          propertiesID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      propertiesID
      properties {
        COUNTRY
        NAME_1
        LAD21NM
        NAME_3
        geoLocationID
        geoLocation {
          id
          geometryID
          propertiesID
          createdAt
          updatedAt
          __typename
        }
        id
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listGeoLocations = /* GraphQL */ `
  query ListGeoLocations(
    $filter: ModelGeoLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGeoLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        geometryID
        geometry {
          id
          geoShapeType
          coordinates
          geoLocationID
          createdAt
          updatedAt
          __typename
        }
        propertiesID
        properties {
          COUNTRY
          NAME_1
          LAD21NM
          NAME_3
          geoLocationID
          id
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchGeoLocations = /* GraphQL */ `
  query SearchGeoLocations(
    $filter: SearchableGeoLocationFilterInput
    $sort: [SearchableGeoLocationSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableGeoLocationAggregationInput]
  ) {
    searchGeoLocations(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        geometryID
        geometry {
          id
          geoShapeType
          coordinates
          geoLocationID
          createdAt
          updatedAt
          __typename
        }
        propertiesID
        properties {
          COUNTRY
          NAME_1
          LAD21NM
          NAME_3
          geoLocationID
          id
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
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getGeometry = /* GraphQL */ `
  query GetGeometry($id: ID!) {
    getGeometry(id: $id) {
      id
      geoShapeType
      coordinates
      geoLocationID
      geoLocation {
        id
        geometryID
        geometry {
          id
          geoShapeType
          coordinates
          geoLocationID
          createdAt
          updatedAt
          __typename
        }
        propertiesID
        properties {
          COUNTRY
          NAME_1
          LAD21NM
          NAME_3
          geoLocationID
          id
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listGeometries = /* GraphQL */ `
  query ListGeometries(
    $filter: ModelGeometryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGeometries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        geoShapeType
        coordinates
        geoLocationID
        geoLocation {
          id
          geometryID
          propertiesID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const geometriesByGeoLocationID = /* GraphQL */ `
  query GeometriesByGeoLocationID(
    $geoLocationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGeometryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    geometriesByGeoLocationID(
      geoLocationID: $geoLocationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        geoShapeType
        coordinates
        geoLocationID
        geoLocation {
          id
          geometryID
          propertiesID
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchGeometries = /* GraphQL */ `
  query SearchGeometries(
    $filter: SearchableGeometryFilterInput
    $sort: [SearchableGeometrySortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableGeometryAggregationInput]
  ) {
    searchGeometries(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        geoShapeType
        coordinates
        geoLocationID
        geoLocation {
          id
          geometryID
          propertiesID
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
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getProperties = /* GraphQL */ `
  query GetProperties($id: ID!) {
    getProperties(id: $id) {
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
          createdAt
          updatedAt
          __typename
        }
        propertiesID
        properties {
          COUNTRY
          NAME_1
          LAD21NM
          NAME_3
          geoLocationID
          id
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProperties = /* GraphQL */ `
  query ListProperties(
    $filter: ModelPropertiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProperties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        COUNTRY
        NAME_1
        LAD21NM
        NAME_3
        geoLocationID
        geoLocation {
          id
          geometryID
          propertiesID
          createdAt
          updatedAt
          __typename
        }
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const propertiesByGeoLocationID = /* GraphQL */ `
  query PropertiesByGeoLocationID(
    $geoLocationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPropertiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    propertiesByGeoLocationID(
      geoLocationID: $geoLocationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
          propertiesID
          createdAt
          updatedAt
          __typename
        }
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchProperties = /* GraphQL */ `
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
          propertiesID
          createdAt
          updatedAt
          __typename
        }
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getCampaign = /* GraphQL */ `
  query GetCampaign($id: ID!) {
    getCampaign(id: $id) {
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
      organization {
        id
        readGroups
        editGroups
        fullGroups
        photo
        organizationName
        rootID
        rootUser {
          id
          photo
          email
          firstName
          lastName
          phoneNumber
          createdAt
          updatedAt
          __typename
        }
        users {
          nextToken
          __typename
        }
        campaigns {
          nextToken
          __typename
        }
        mediaContent {
          nextToken
          __typename
        }
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
        createdAt
        updatedAt
        __typename
      }
      paymentMethodId
      stripeCustomerId
      payingAmount
      transactionDateTime
      paidByUserEmail
      paymentIntentId
      currency
      isLaunched
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCampaigns = /* GraphQL */ `
  query ListCampaigns(
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCampaigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          createdAt
          updatedAt
          __typename
        }
        paymentMethodId
        stripeCustomerId
        payingAmount
        transactionDateTime
        paidByUserEmail
        paymentIntentId
        currency
        isLaunched
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const campaignsByOrganizationID = /* GraphQL */ `
  query CampaignsByOrganizationID(
    $organizationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    campaignsByOrganizationID(
      organizationID: $organizationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
          createdAt
          updatedAt
          __typename
        }
        paymentMethodId
        stripeCustomerId
        payingAmount
        transactionDateTime
        paidByUserEmail
        paymentIntentId
        currency
        isLaunched
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchCampaigns = /* GraphQL */ `
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
          createdAt
          updatedAt
          __typename
        }
        paymentMethodId
        stripeCustomerId
        payingAmount
        transactionDateTime
        paidByUserEmail
        paymentIntentId
        currency
        isLaunched
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getScreenGeoLocation = /* GraphQL */ `
  query GetScreenGeoLocation($id: ID!) {
    getScreenGeoLocation(id: $id) {
      id
      targetCountry
      maxCapacity
      deviceName
      isAllVenueSelected
      targetVenues
      lat
      lng
      height
      width
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listScreenGeoLocations = /* GraphQL */ `
  query ListScreenGeoLocations(
    $filter: ModelScreenGeoLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScreenGeoLocations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        targetCountry
        maxCapacity
        deviceName
        isAllVenueSelected
        targetVenues
        lat
        lng
        height
        width
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchScreenGeoLocations = /* GraphQL */ `
  query SearchScreenGeoLocations(
    $filter: SearchableScreenGeoLocationFilterInput
    $sort: [SearchableScreenGeoLocationSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableScreenGeoLocationAggregationInput]
  ) {
    searchScreenGeoLocations(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        targetCountry
        maxCapacity
        deviceName
        isAllVenueSelected
        targetVenues
        lat
        lng
        height
        width
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getVenueCatalog = /* GraphQL */ `
  query GetVenueCatalog($id: ID!) {
    getVenueCatalog(id: $id) {
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
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listVenueCatalogs = /* GraphQL */ `
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
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getVenueCatalogItem = /* GraphQL */ `
  query GetVenueCatalogItem($id: ID!) {
    getVenueCatalogItem(id: $id) {
      id
      venueItemName
      isSelectable
      description
      thumbnail
      venueCatalogID
      VenueCatalog {
        id
        venuePrsetName
        isSelectable
        venueCatalogItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listVenueCatalogItems = /* GraphQL */ `
  query ListVenueCatalogItems(
    $filter: ModelVenueCatalogItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVenueCatalogItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        venueItemName
        isSelectable
        description
        thumbnail
        venueCatalogID
        VenueCatalog {
          id
          venuePrsetName
          isSelectable
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const venueCatalogItemsByVenueCatalogID = /* GraphQL */ `
  query VenueCatalogItemsByVenueCatalogID(
    $venueCatalogID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVenueCatalogItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    venueCatalogItemsByVenueCatalogID(
      venueCatalogID: $venueCatalogID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        venueItemName
        isSelectable
        description
        thumbnail
        venueCatalogID
        VenueCatalog {
          id
          venuePrsetName
          isSelectable
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getServiceCatalog = /* GraphQL */ `
  query GetServiceCatalog($id: ID!) {
    getServiceCatalog(id: $id) {
      id
      serviceName
      isSelectable
      serviceCatalogItems {
        items {
          id
          ServiceCatalogName
          isSelectable
          serviceCatalogID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listServiceCatalogs = /* GraphQL */ `
  query ListServiceCatalogs(
    $filter: ModelServiceCatalogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServiceCatalogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        serviceName
        isSelectable
        serviceCatalogItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getServiceCatalogItem = /* GraphQL */ `
  query GetServiceCatalogItem($id: ID!) {
    getServiceCatalogItem(id: $id) {
      id
      ServiceCatalogName
      isSelectable
      serviceCatalogID
      ServiceCatalog {
        id
        serviceName
        isSelectable
        serviceCatalogItems {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listServiceCatalogItems = /* GraphQL */ `
  query ListServiceCatalogItems(
    $filter: ModelServiceCatalogItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServiceCatalogItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ServiceCatalogName
        isSelectable
        serviceCatalogID
        ServiceCatalog {
          id
          serviceName
          isSelectable
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
