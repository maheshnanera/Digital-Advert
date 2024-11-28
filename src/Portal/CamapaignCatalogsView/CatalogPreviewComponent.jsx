/* eslint-disable react/no-unknown-property */
import { Avatar } from 'antd';
import React from 'react';

function CatalogPreviewComponent(props) {
  const { catalogItem } = props;

  return (
    <div className="mt-10">

      <span style={{ fontSize: '16px', fontWeight: 700, marginLeft: '30px' }}>{catalogItem?.venueItemName}</span>
      <div>
        {catalogItem?.image ? (<img src={catalogItem?.image} alt="" className="media-content-preview " style={{ padding: '30px' }} />
        ) : (
          <Avatar style={{ backgroundColor: '#87d068' }} size="large" shape="square">
            {catalogItem?.venueItemName.charAt(0).toUpperCase()}
          </Avatar>
        )}
      </div>
      <div className="mt-10" style={{ paddingLeft: '30px' }}>
        <span style={{ fontWeight: 600 }}>Description : </span>
        <span level={5}>{catalogItem?.description}</span>
      </div>
    </div>
  );
}

export default CatalogPreviewComponent;
