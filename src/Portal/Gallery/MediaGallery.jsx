/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import {
  Row, Col, message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import GalleryHeader from './Compnents/GalleryHeader';
import GalleryZeroState from './Compnents/GalleryZeroState';
import GallerySubHeader from './Compnents/GallerySubHeader';
import UploadMedia from './Compnents/UploadMedia';
import { setAllMedia, setOpenAddMediaModal } from '../../store/slices/portalSlice';
import { GetFileFromS3, uploadFileToS3 } from '../../ReUsableFunctions/UploadFile';
import {
  CreateMediaContentAction,
  DeleteMediaContentAction,
  ListMediaContentActionCustom,
  openSearchMediaByName,
} from '../../User/UserActions';
import MediaCard from './Compnents/MediaCard';
import './MediaContent.css';
import { determineFileType } from '../../ReUsableFunctions/ReUsableFunction';

const PAGE_SIZE = 15;

function MediaGallery() {
  const {
    openAddMediaModal, organization, allMedia, mediaFilterType, mediaSearchQuery,
  } = useSelector((state) => state.portal);

  const dispatch = useDispatch();
  const [isLoadingAddMedia, setIsLoadingAddMedia] = useState(false);
  const [mediaNextToken, setMediaNextToken] = useState('');
  const [loadingMoreResult, setLoadingMoreResult] = useState(false);
  const tableEl = useRef();

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
  const fetchOrgMedias = async (nextTokenToUse = null) => {
    const orgID = organization?.id;
    const filter = {
      organizationID: {
        eq: orgID,
      },
    };
    const limit = PAGE_SIZE;
    const data = await ListMediaContentActionCustom(filter, limit, nextTokenToUse);
    const dataWithImage = await getPhotoURLsFromS3(data?.items);

    setMediaNextToken(data.nextToken);
    setLoadingMoreResult(false);
    if (nextTokenToUse) {
      dispatch(setAllMedia([...allMedia, ...dataWithImage]));
    } else {
      dispatch(setAllMedia(dataWithImage));
    }
  };

  useEffect(() => {
    fetchOrgMedias();
  }, []);

  const handleScroll = useCallback(() => {
    const clientHeight = window.innerHeight;
    const { scrollTop } = document.documentElement;
    const scrollHeight = document.documentElement.offsetHeight;

    if (scrollTop + clientHeight >= scrollHeight && mediaNextToken && !loadingMoreResult) {
      setLoadingMoreResult(true);
      fetchOrgMedias(mediaNextToken);
    }
  }, [mediaNextToken, loadingMoreResult, allMedia]);

  useLayoutEffect(() => {
    const tableRef = tableEl.current;

    if (tableRef) {
      tableRef.addEventListener('scroll', handleScroll);
      return () => {
        tableRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const handleModalCancel = () => {
    dispatch(setOpenAddMediaModal(false));
  };

  const getMediaInfo = (file) => new Promise((resolve) => {
    const fileType = determineFileType(file.type);
    console.log('fileTye', fileType);
    if (fileType === 'Image') {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height, duration: null });
      };
      img.src = URL.createObjectURL(file);
    } else if (fileType === 'Video') {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        resolve({
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration,
        });
      };
      video.src = URL.createObjectURL(file);
    } else {
      resolve({ width: null, height: null, duration: null });
    }
  });

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
      mediaWidth: mediaInfo.width,
      mediaHeight: mediaInfo.height,
      videoDuration: mediaInfo.duration,
    };
    console.log('inputData', inputData);

    await CreateMediaContentAction(inputData);
    fetchOrgMedias();
    setIsLoadingAddMedia(false);
    dispatch(setOpenAddMediaModal(false));
  };

  const filteredMediaContent = allMedia
    ?.filter((item) => {
      const { mediaName } = item;
      if (mediaSearchQuery) {
        return mediaName.toLowerCase().includes(mediaSearchQuery.toLowerCase());
      }
      if (mediaFilterType && mediaFilterType !== 'all') {
        console.log('mediaName.contentType?.toLowerCase()', item.contentType?.toLowerCase());
        return item.contentType?.toLowerCase() === mediaFilterType;
      }
      return true;
    })
    ?.sort(async (a, b) => {
      if (mediaFilterType === 'video') {
        return a?.contentType === 'Video';
      } if (mediaFilterType === 'image') {
        return a?.contentType === 'Image';
      }
      return 0;
    });

  const debouncedFetchCities = useCallback(
    debounce(async () => {
      try {
        const filter = {
          mediaName:
            { wildcard: `*${mediaSearchQuery.toLowerCase()}*` },
          organizationID: {
            eq: organization?.id,
          },
        };
        console.log('filter', filter);
        const response = await openSearchMediaByName(filter);
        console.log('response', response);
        const dataWithImage = await getPhotoURLsFromS3(response?.items);
        dispatch(setAllMedia(dataWithImage));
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }, 300),
    [mediaSearchQuery],
  );

  useEffect(() => {
    if (mediaSearchQuery && mediaSearchQuery !== '') {
      debouncedFetchCities();
    } else {
      fetchOrgMedias();
    }
  }, [mediaSearchQuery]);

  const handleDeleteContent = (e, id) => {
    e.stopPropagation();
    const updatedMedia = allMedia.filter((item) => item.id !== id);
    DeleteMediaContentAction(id);
    dispatch(setAllMedia(updatedMedia));
    message.success('Media Deleted Successfully');
  };

  return (
    <div className="flex flexColumn h-full">
      <GalleryHeader />

      <div className="pt-10 pb-10 h-full">
        <GallerySubHeader />
        {filteredMediaContent?.length === 0 && <GalleryZeroState />}
        {filteredMediaContent?.length > 0 && (
        <div style={{ padding: '30px', maxHeight: loadingMoreResult ? '580px' : '600px', overflowY: 'auto' }} ref={tableEl}>
          <Row gutter={[16, 16]}>
            {filteredMediaContent.map((media, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                <MediaCard mediaFile={media} handleDelete={handleDeleteContent} />
              </Col>
            ))}
          </Row>
        </div>
        )}
        {openAddMediaModal
          && (
          <UploadMedia
            onCancel={handleModalCancel}
            onUpload={handleUploadMedia}
            loading={isLoadingAddMedia}
          />
          )}
      </div>
      {loadingMoreResult && (
      <div
        className="flex justify-center items-center"
      >
        <span
          style={{
            fontSize: '12px',
            lineHeight: '15px',
            color: '#9E9E9E',
          }}
        >
          Loading next 15 results
        </span>
      </div>
      )}
    </div>
  );
}

export default MediaGallery;
