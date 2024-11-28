// ** React imports */
import React from 'react';

/**
 * FullPageLayout component
 * @function FullPageLayout
 * @return {<FullPageLayout children/>}
 */
function FullPageLayout({ children }) {
  return <main className="main text-muted">{children}</main>;
}

export default FullPageLayout;
