/* eslint-disable no-unused-vars */
import {
  uploadData, getUrl, remove, downloadData,
} from 'aws-amplify/storage';

export const uploadFileToS3 = async (file, fileName, params = {}) => {
  const currentDateTime = new Date().valueOf();
  const name = fileName ?? file?.name;
  const newFileName = `${name?.replace(
    /\.[^/.]+$/,
    '',
  )}_${currentDateTime}.${file.name.replace(/(.*)\./g, '')}`;

  const result = await uploadData({
    key: newFileName,
    data: file,
    options: {
      contentType: file.type,
      metadata: {
        key: newFileName,
        type: file.type,
      },
    },
  }).result;
  return result;
};

export const GetFileFromS3 = async (key, level) => await getUrl({ key, options: { level: 'guest' } });

export const downloadFileFromS3 = async (key, level) => await downloadData({
  key,
  options: {
    accessLevel: 'guest',
  },
});

export const deleteFileFromS3 = async (key, level) => await remove(key);
