import {
  ExecuteMutation,
  ExecuteQuery,
} from '../Utils/Api';

export const getOrganization = (id) => ExecuteMutation('getOrganization', undefined, { id });

export const getOrganizationMembers = (organizationID) => ExecuteQuery('organizationRolesByOrganizationID', undefined, { organizationID });

export const getUserAction = (id) => ExecuteQuery('getUser', undefined, { id });

export const UpdateUserAction = (inputData) => ExecuteMutation('updateUser', inputData);

export const getOrganizationByUserCustom = (id) => ExecuteQuery('organizationRolesByUserIDCustom', undefined, { userID: id });

export const UpdateOrganization = (inputData) => ExecuteMutation('updateOrganization', inputData);

export const UpdateOrganizationRole = (inputData) => ExecuteMutation('updateOrganizationRole', inputData);

export const CreateOrganization = (inputData) => ExecuteMutation('createOrganization', inputData);

export const CreateOrganizationRole = (inputData) => ExecuteMutation('createOrganizationRole', inputData);

// Geo Location integration

export const ListScreenLocation = (filter) => ExecuteQuery('listScreenLocations', undefined, filter);

export const CreateScreenLocation = (inputData) => ExecuteMutation('createScreenLocation', inputData);

export const ListScreenGeoLocation = (filter) => ExecuteQuery('listScreenGeoLocations', undefined, undefined, filter);

export const CreateScreenGeoLocation = (inputData) => ExecuteMutation('createScreenGeoLocation', inputData);

export const UpdateScreenGeoLocation = (inputData) => ExecuteMutation('updateScreenGeoLocation', inputData);
export const DeleteScreenGeoLocation = (id) => ExecuteMutation('deleteScreenGeoLocation', { id });

// Venue catalog

export const CreateVenuePreset = (inputData) => ExecuteMutation('createVenueCatalog', inputData);

export const DeleteVenuePreset = (id) => ExecuteMutation('deleteVenueCatalog', { id });

export const CreateVenueCatalogItem = (inputData) => ExecuteMutation('createVenueCatalogItem', inputData);

export const DeleteVenueCatalogItem = (id) => ExecuteMutation('deleteVenueCatalogItem', { id });

export const ListVenueCatalogItems = (filter) => ExecuteQuery('listVenueCatalogsCustom', undefined, undefined, filter);
export const ListVenueCatalogItemsDataCustom = (filter) => ExecuteQuery('listVenueCatalogItems', undefined, undefined, filter);

// Campaign Initialization

export const CreateCampaign = (inputData) => ExecuteMutation('createCampaign', inputData);

export const UpdateCampaign = (inputData) => ExecuteMutation('updateCampaign', inputData);
export const UpdateCampaignCustom = (inputData) => ExecuteMutation('updateCampaignCustom', inputData);

export const DeleteCampaign = (id) => ExecuteMutation('deleteCampaign', { id });

export const ListCampaigns = (filter, limit, nexToken) => ExecuteQuery('listCampaigns', undefined, undefined, filter, nexToken, limit);

export const ListCampaignsCustom = (filter, limit, nexToken) => ExecuteQuery('listCampaignsCustom', undefined, undefined, filter, nexToken, limit);

// OpenSearch query

export const openSearchCityByName = (filter) => ExecuteQuery('searchPropertiesCustom', undefined, undefined, filter);

export const openSearchCampaignByName = (filter) => ExecuteQuery('searchCampaignsCustom', undefined, undefined, filter);

export const openSearchMediaByName = (filter) => ExecuteQuery('searchMediaContentsCustom', undefined, undefined, filter);

// export const openSearchGetGeoJsonByName = (filter) => {
//  return ExecuteQueryCustom("searchPropertiesCustomForCoordinates",undefined, undefined,filter);
// };
export const openSearchGetGeoJsonByName = (filter) => ExecuteQuery('searchPropertiesCustomForCoordinates', undefined, undefined, filter);

// Media Gallery Actions

export const CreateMediaContentAction = (inputData) => ExecuteMutation('createMediaContent', inputData);
export const DeleteMediaContentAction = (id) => ExecuteMutation('deleteMediaContent', { id });
export const ListMediaContentAction = (filter, limit, nexToken) => ExecuteQuery('listMediaContents', undefined, undefined, filter, nexToken, limit);

export const ListMediaContentActionCustom = (filter, limit, nexToken) => ExecuteQuery('listMediaContentsCustom', undefined, undefined, filter, nexToken, limit);
