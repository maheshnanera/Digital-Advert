import React from 'react';
import { Layout, Button, Tooltip } from 'antd';

function GlobalFooterForContinue(props) {
  const { Footer } = Layout;
  const {
    handleNextButton, handleCancelButton, className, hideBackButton, shouldNotContinue,
    nextTitle = 'Next',
  } = props;

  return (
    <Footer
      style={{
        display: 'flex', justifyContent: 'space-between', padding: '8px', zIndex: 1,
      }}
      className={className}
    >
      {!hideBackButton ? (
        <Button
          style={{ width: '128px', height: '40px' }}
          type="basic"
          onClick={handleCancelButton}
        >
          Back
        </Button>
      ) : <div />}
      <Tooltip title={shouldNotContinue || ''}>
        <Button type="primary" style={{ width: nextTitle === 'Next' ? '128px' : '150px', height: '40px' }} onClick={handleNextButton} disabled={shouldNotContinue}>{nextTitle}</Button>
      </Tooltip>
    </Footer>
  );
}

export default GlobalFooterForContinue;
