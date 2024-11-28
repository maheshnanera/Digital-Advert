/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Layout, Row, Col, Skeleton,
  message,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GlobalHeaderForSaveAndExit from '../../../ReUsableComponent/GlobalHeaderForSaveAndExit';
import GlobalFooterForContinue from '../../../ReUsableComponent/GlobalFooterForContinue';
import { determineFileType, updateCampaignFields } from '../../../ReUsableFunctions/ReUsableFunction';
import MediaCardForCampaign from './MediaCardForCampaign';
import GalleryZeroState from '../../Gallery/Compnents/GalleryZeroState';
import { setAllMedia, setNoCompatibleData, setOpenAddMediaModal } from '../../../store/slices/portalSlice';
import { GetFileFromS3, uploadFileToS3 } from '../../../ReUsableFunctions/UploadFile';
import { CreateMediaContentAction } from '../../../User/UserActions';
import UploadMedia from '../../Gallery/Compnents/UploadMedia';
import { setNewCampaign } from '../../../store/slices/campaignSlice';
import { RESTPost } from '../../../Utils/RestApi';
import GalleryNoCompatibleState from '../../Gallery/Compnents/GalleryNoCompatibleState';

function CampaignMedia() {
  const history = useHistory();
  const { newCampaign } = useSelector((state) => state.campaign);
  const {
    organization, allMedia, openAddMediaModal, noCompatibleData,
  } = useSelector((state) => state.portal);

  const [selectedCards, setSelectedCards] = useState([]);
  const [isLoadingAddMedia, setIsLoadingAddMedia] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const dispatch = useDispatch();

  const getPhotoURLsFromS3 = async (data) => {
    const updatedData = await Promise.all(
      data.map(async (mediaFile) => {
        if (mediaFile?.media) {
          const mediaUrl = await GetFileFromS3(mediaFile?.media);
          return {
            ...mediaFile,
            mediaUrl: mediaUrl?.url,
          };
        }
        return mediaFile;
      }),
    );
    return updatedData;
  };
  // This will fetch all media for org

  const fetchOrgMedias = async () => {
    try {
      dispatch(setAllMedia([]));
      setIsLoadingData(true);
      const inputData = {
        organization_id: organization?.id,
        target_cities: newCampaign?.targetCities,
      };
      const restOperation = await RESTPost('/get-compatible-media', inputData);
      const { body } = await restOperation.response;
      // eslint-disable-next-line camelcase
      const data = await body.json();
      console.log('data', data);
      if (data === 'No any media is compitible with devices of your selected geo locations.') {
        dispatch(setNoCompatibleData(true));

        console.log('Warning: Received empty data from API');
        dispatch(setAllMedia([]));
        setIsLoadingData(false);
      } else {
        dispatch(setNoCompatibleData(false));
        const dataWithImage = await getPhotoURLsFromS3(data);
        dispatch(setAllMedia(dataWithImage));
        setIsLoadingData(false);
      }
    } catch (e) {
      console.error('Error fetching media:', e);
      message.error('Something went wrong');
      setIsLoadingData(false);
      // Handle the error appropriately
    }
  };

  useEffect(() => {
    fetchOrgMedias();
  }, []);
  useEffect(() => {
    if (refreshData) {
      fetchOrgMedias();
      setRefreshData(false);
    }
  }, [refreshData]);

  const handleNextStep = async () => {
    const newData = await updateCampaignFields(newCampaign, 'targetMediaContents', selectedCards, 'GALLERY');
    dispatch(setNewCampaign(newData));

    history.push(`/campaign/${newCampaign?.id}/review`);
  };
  const handleGoBack = () => {
    history.push(`/campaign/${newCampaign?.id}/timings`);
    // history.goBack();
  };

  const getMediaInfo = (file) => new Promise((resolve) => {
    const fileType = determineFileType(file.type);
    if (fileType === 'Image') {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img?.width, height: img?.height, duration: null });
      };
      img.src = URL.createObjectURL(file);
    } else if (fileType === 'Video') {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        resolve({
          width: video?.videoWidth,
          height: video?.videoHeight,
          duration: video?.duration,
        });
      };
      video.src = URL.createObjectURL(file);
    } else {
      resolve({ width: null, height: null, duration: null });
    }
  });

  const handleModalCancel = () => {
    dispatch(setOpenAddMediaModal(false));
  };
  const handleUploadMedia = async (fileList, description) => {
    setIsLoadingAddMedia(true);
    const mediaInfo = await getMediaInfo(fileList[0].originFileObj);
    const res = await uploadFileToS3(fileList[0].originFileObj);
    const inputData = {
      mediaName: fileList[0].name,
      media: res.key,
      organizationID: organization?.id,
      contentType: determineFileType(fileList[0].originFileObj.type),
      description,
      mediaWidth: mediaInfo?.width,
      mediaHeight: mediaInfo?.height,
      videoDuration: mediaInfo?.duration,
    };
    await CreateMediaContentAction(inputData);
    fetchOrgMedias();
    setIsLoadingAddMedia(false);
    dispatch(setOpenAddMediaModal(false));
  };

  const handleSaveExit = async () => {
    updateCampaignFields(newCampaign, 'targetMediaContents', selectedCards, 'GALLERY');
    dispatch(setNewCampaign(null));
    history.push('/');
  };

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <GlobalHeaderForSaveAndExit handelSaveExit={handleSaveExit} stepNumber={4} headerTitle="Gallery" subHeaderTitle="Select the media to show in campaign" shouldNotContinue={selectedCards?.length > 0 ? '' : 'Please Select Media'} />
      {isLoadingData
      && (
      <div style={{ padding: '30px', height: 'calc(100vh - 64px - 138px)', overflowY: 'auto' }} className="image-skeleton">
        <Skeleton height="100%" style={{ height: '100%', width: '100%' }} active />
      </div>
      )}
      {(allMedia?.length === 0 && !noCompatibleData && !isLoadingData) && <GalleryZeroState />}
      {(allMedia?.length === 0 && noCompatibleData && !isLoadingData)
       && <GalleryNoCompatibleState />}
      {allMedia?.length > 0 && (
      <div style={{ padding: '30px', height: 'calc(100vh - 64px - 138px)', overflowY: 'auto' }}>
        <Row gutter={[16, 16]}>
          {allMedia.map((media, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
              <MediaCardForCampaign
                mediaFile={media}
                setSelectedCards={setSelectedCards}
                selectedCards={selectedCards}
              />
            </Col>
          ))}
        </Row>
      </div>
      )}
      <GlobalFooterForContinue
        handleNextButton={handleNextStep}
        handleCancelButton={handleGoBack}
        shouldNotContinue={selectedCards?.length > 0 ? '' : 'Please Select Media'}
      />
      {openAddMediaModal
          && (
          <UploadMedia
            onCancel={handleModalCancel}
            onUpload={handleUploadMedia}
            loading={isLoadingAddMedia}
            fromCampaign
            setRefreshData={setRefreshData}
          />
          )}
    </Layout>
  );
}

export default CampaignMedia;
