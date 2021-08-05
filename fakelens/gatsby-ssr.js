/*eslint-disable */

import React from 'react';

import Root from './src/components/Root';
import BlogLayout from './src/components/layout/blog';
import SiteLayout from './src/components/layout/site';
import './src/styles/reset.css';
import './src/styles/global.css';
import './src/styles/fonts.css';

const wrapRootElement = Root;

const wrapPageElement = ({ element: page }) => {
  const { path } = page.props;
  // eslint-disable-next-line react/jsx-filename-extension
  if (/^\/blog/.test(path)) return <BlogLayout>{page}</BlogLayout>;
  return <SiteLayout>{page}</SiteLayout>;
};

export default {};

export { wrapRootElement, wrapPageElement };
