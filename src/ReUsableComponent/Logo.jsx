import React from 'react';
import { useHistory } from 'react-router-dom';

function Logo(props) {
  const history = useHistory();
  return (
    <div className="company_logo" style={{ height: 'auto', marginTop: '10px' }}>
      <img
    // src={props.datafromparent?.collapsed ? logoshort : logo}
        height={20}
        alt="IDA Logo"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          if (Object.keys(props).length > 0) {
            props.handleChangKey('home');
          }
          if (history.location.pathname !== '/setup') {
            history.push('/');
          }
        }}
        onKeyUp={() => {
          if (Object.keys(props).length > 0) {
            props.handleChangKey('home');
          }
          if (history.location.pathname !== '/setup') {
            history.push('/');
          }
        }}
        tabIndex={0}
        role="button"
      />
    </div>
  );
}

export default Logo;
