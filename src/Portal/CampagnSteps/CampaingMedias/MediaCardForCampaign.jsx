/* eslint-disable no-nested-ternary */
import React from 'react';
import { Card, Skeleton, Checkbox } from 'antd';

function MediaCardForCampaign(props) {
  const { mediaFile, selectedCards, setSelectedCards } = props;

  const handleCardSelection = (checked, cardId) => {
    if (checked) {
      setSelectedCards([...selectedCards, cardId]);
    } else {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    }
  };

  const isSelected = !selectedCards.includes(mediaFile?.id);
  return (
    <Card
      hoverable
      coverStyle={{
        position: 'relative',
      }}
      onClick={() => handleCardSelection(isSelected, mediaFile?.id)}
      className="campaignMedia"
      cover={
        mediaFile?.contentType === 'Image' ? (
          <div style={{ position: 'relative' }}>
            <img alt={mediaFile?.mediaName} src={mediaFile?.mediaUrl} className="media-content" />
            <Checkbox
              key={mediaFile?.id}
              checked={selectedCards.includes(mediaFile?.id)}
              onChange={(e) => handleCardSelection(e.target.checked, mediaFile?.id)}
              style={{ position: 'absolute', top: 8, right: 8 }}
            />
          </div>
        ) : mediaFile?.contentType === 'Video' ? (
          <div style={{ position: 'relative' }}>
            <video width="100%" className="media-content" muted>
              <source src={mediaFile?.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Checkbox
              key={mediaFile?.id}
              checked={selectedCards.includes(mediaFile?.id)}
              onChange={(e) => handleCardSelection(e.target.checked, mediaFile?.id)}
              style={{ position: 'absolute', top: 8, right: 8 }}
            />
          </div>
        ) : (
          <div className="media-content image-skeleton">
            <Skeleton.Image height="100%" style={{ height: '100%', width: '100%' }} active />
          </div>
        )
      }
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', gap: '6px', flexDirection: 'column',
      }}
      >
        <div className="clipToOneLines">{mediaFile?.mediaName}</div>
        <div className="clipToOneLines">
          Compatible To :
          { ' '}
          {mediaFile?.compatible_devices?.length}
          {' '}
          Device
        </div>
        <div style={{ fontSize: '14px', fontWeight: 500 }}>{mediaFile?.contentType}</div>
      </div>
    </Card>
  );
}

export default MediaCardForCampaign;
