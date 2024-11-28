import { UpdateCampaignCustom } from '../User/UserActions';

export async function updateCampaignFields(campaign, fieldToUpdate, fieldValue, stepValue) {
  const inputData = {
    id: campaign?.id,
    [fieldToUpdate]: fieldValue,
    status: stepValue,
  };
  const data = await UpdateCampaignCustom(inputData);

  return data;
}

export async function updateCampaignDateFields(
  campaign, startTimeFormate, endTimeFormate, stepValue,
) {
  const inputData = {
    id: campaign?.id,
    startTime: startTimeFormate,
    endTime: endTimeFormate,
    status: stepValue,
  };
  const data = await UpdateCampaignCustom(inputData);
  return data;
}

export function determineFileType(contentType) {
  if (contentType.startsWith('image/')) {
    return 'Image';
  } if (contentType.startsWith('video/')) {
    return 'Video';
  }
  return 'unknown';
}

export default {
  updateCampaignFields,
  updateCampaignDateFields,
  determineFileType,
};
