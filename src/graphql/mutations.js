/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
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
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
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
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createMediaContent = /* GraphQL */ `
  mutation CreateMediaContent(
    $input: CreateMediaContentInput!
    $condition: ModelMediaContentConditionInput
  ) {
    createMediaContent(input: $input, condition: $condition) {
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
export const updateMediaContent = /* GraphQL */ `
  mutation UpdateMediaContent(
    $input: UpdateMediaContentInput!
    $condition: ModelMediaContentConditionInput
  ) {
    updateMediaContent(input: $input, condition: $condition) {
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
export const deleteMediaContent = /* GraphQL */ `
  mutation DeleteMediaContent(
    $input: DeleteMediaContentInput!
    $condition: ModelMediaContentConditionInput
  ) {
    deleteMediaContent(input: $input, condition: $condition) {
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
export const createOrganizationRole = /* GraphQL */ `
  mutation CreateOrganizationRole(
    $input: CreateOrganizationRoleInput!
    $condition: ModelOrganizationRoleConditionInput
  ) {
    createOrganizationRole(input: $input, condition: $condition) {
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
export const updateOrganizationRole = /* GraphQL */ `
  mutation UpdateOrganizationRole(
    $input: UpdateOrganizationRoleInput!
    $condition: ModelOrganizationRoleConditionInput
  ) {
    updateOrganizationRole(input: $input, condition: $condition) {
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
export const deleteOrganizationRole = /* GraphQL */ `
  mutation DeleteOrganizationRole(
    $input: DeleteOrganizationRoleInput!
    $condition: ModelOrganizationRoleConditionInput
  ) {
    deleteOrganizationRole(input: $input, condition: $condition) {
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
export const createGeoLocation = /* GraphQL */ `
  mutation CreateGeoLocation(
    $input: CreateGeoLocationInput!
    $condition: ModelGeoLocationConditionInput
  ) {
    createGeoLocation(input: $input, condition: $condition) {
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
export const updateGeoLocation = /* GraphQL */ `
  mutation UpdateGeoLocation(
    $input: UpdateGeoLocationInput!
    $condition: ModelGeoLocationConditionInput
  ) {
    updateGeoLocation(input: $input, condition: $condition) {
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
export const deleteGeoLocation = /* GraphQL */ `
  mutation DeleteGeoLocation(
    $input: DeleteGeoLocationInput!
    $condition: ModelGeoLocationConditionInput
  ) {
    deleteGeoLocation(input: $input, condition: $condition) {
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
export const createGeometry = /* GraphQL */ `
  mutation CreateGeometry(
    $input: CreateGeometryInput!
    $condition: ModelGeometryConditionInput
  ) {
    createGeometry(input: $input, condition: $condition) {
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
export const updateGeometry = /* GraphQL */ `
  mutation UpdateGeometry(
    $input: UpdateGeometryInput!
    $condition: ModelGeometryConditionInput
  ) {
    updateGeometry(input: $input, condition: $condition) {
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
export const deleteGeometry = /* GraphQL */ `
  mutation DeleteGeometry(
    $input: DeleteGeometryInput!
    $condition: ModelGeometryConditionInput
  ) {
    deleteGeometry(input: $input, condition: $condition) {
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
export const createProperties = /* GraphQL */ `
  mutation CreateProperties(
    $input: CreatePropertiesInput!
    $condition: ModelPropertiesConditionInput
  ) {
    createProperties(input: $input, condition: $condition) {
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
export const updateProperties = /* GraphQL */ `
  mutation UpdateProperties(
    $input: UpdatePropertiesInput!
    $condition: ModelPropertiesConditionInput
  ) {
    updateProperties(input: $input, condition: $condition) {
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
export const deleteProperties = /* GraphQL */ `
  mutation DeleteProperties(
    $input: DeletePropertiesInput!
    $condition: ModelPropertiesConditionInput
  ) {
    deleteProperties(input: $input, condition: $condition) {
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
export const createCampaign = /* GraphQL */ `
  mutation CreateCampaign(
    $input: CreateCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    createCampaign(input: $input, condition: $condition) {
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
export const updateCampaign = /* GraphQL */ `
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
export const deleteCampaign = /* GraphQL */ `
  mutation DeleteCampaign(
    $input: DeleteCampaignInput!
    $condition: ModelCampaignConditionInput
  ) {
    deleteCampaign(input: $input, condition: $condition) {
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
export const createScreenGeoLocation = /* GraphQL */ `
  mutation CreateScreenGeoLocation(
    $input: CreateScreenGeoLocationInput!
    $condition: ModelScreenGeoLocationConditionInput
  ) {
    createScreenGeoLocation(input: $input, condition: $condition) {
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
export const updateScreenGeoLocation = /* GraphQL */ `
  mutation UpdateScreenGeoLocation(
    $input: UpdateScreenGeoLocationInput!
    $condition: ModelScreenGeoLocationConditionInput
  ) {
    updateScreenGeoLocation(input: $input, condition: $condition) {
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
export const deleteScreenGeoLocation = /* GraphQL */ `
  mutation DeleteScreenGeoLocation(
    $input: DeleteScreenGeoLocationInput!
    $condition: ModelScreenGeoLocationConditionInput
  ) {
    deleteScreenGeoLocation(input: $input, condition: $condition) {
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
export const createVenueCatalog = /* GraphQL */ `
  mutation CreateVenueCatalog(
    $input: CreateVenueCatalogInput!
    $condition: ModelVenueCatalogConditionInput
  ) {
    createVenueCatalog(input: $input, condition: $condition) {
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
export const updateVenueCatalog = /* GraphQL */ `
  mutation UpdateVenueCatalog(
    $input: UpdateVenueCatalogInput!
    $condition: ModelVenueCatalogConditionInput
  ) {
    updateVenueCatalog(input: $input, condition: $condition) {
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
export const deleteVenueCatalog = /* GraphQL */ `
  mutation DeleteVenueCatalog(
    $input: DeleteVenueCatalogInput!
    $condition: ModelVenueCatalogConditionInput
  ) {
    deleteVenueCatalog(input: $input, condition: $condition) {
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
export const createVenueCatalogItem = /* GraphQL */ `
  mutation CreateVenueCatalogItem(
    $input: CreateVenueCatalogItemInput!
    $condition: ModelVenueCatalogItemConditionInput
  ) {
    createVenueCatalogItem(input: $input, condition: $condition) {
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
export const updateVenueCatalogItem = /* GraphQL */ `
  mutation UpdateVenueCatalogItem(
    $input: UpdateVenueCatalogItemInput!
    $condition: ModelVenueCatalogItemConditionInput
  ) {
    updateVenueCatalogItem(input: $input, condition: $condition) {
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
export const deleteVenueCatalogItem = /* GraphQL */ `
  mutation DeleteVenueCatalogItem(
    $input: DeleteVenueCatalogItemInput!
    $condition: ModelVenueCatalogItemConditionInput
  ) {
    deleteVenueCatalogItem(input: $input, condition: $condition) {
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
export const createServiceCatalog = /* GraphQL */ `
  mutation CreateServiceCatalog(
    $input: CreateServiceCatalogInput!
    $condition: ModelServiceCatalogConditionInput
  ) {
    createServiceCatalog(input: $input, condition: $condition) {
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
export const updateServiceCatalog = /* GraphQL */ `
  mutation UpdateServiceCatalog(
    $input: UpdateServiceCatalogInput!
    $condition: ModelServiceCatalogConditionInput
  ) {
    updateServiceCatalog(input: $input, condition: $condition) {
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
export const deleteServiceCatalog = /* GraphQL */ `
  mutation DeleteServiceCatalog(
    $input: DeleteServiceCatalogInput!
    $condition: ModelServiceCatalogConditionInput
  ) {
    deleteServiceCatalog(input: $input, condition: $condition) {
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
export const createServiceCatalogItem = /* GraphQL */ `
  mutation CreateServiceCatalogItem(
    $input: CreateServiceCatalogItemInput!
    $condition: ModelServiceCatalogItemConditionInput
  ) {
    createServiceCatalogItem(input: $input, condition: $condition) {
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
export const updateServiceCatalogItem = /* GraphQL */ `
  mutation UpdateServiceCatalogItem(
    $input: UpdateServiceCatalogItemInput!
    $condition: ModelServiceCatalogItemConditionInput
  ) {
    updateServiceCatalogItem(input: $input, condition: $condition) {
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
export const deleteServiceCatalogItem = /* GraphQL */ `
  mutation DeleteServiceCatalogItem(
    $input: DeleteServiceCatalogItemInput!
    $condition: ModelServiceCatalogItemConditionInput
  ) {
    deleteServiceCatalogItem(input: $input, condition: $condition) {
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
