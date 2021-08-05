import React from 'react';
import Amplify from 'aws-amplify';

import Root from './src/components/Root';
import BlogLayout from './src/components/layout/blog';
import SiteLayout from './src/components/layout/site';
import './src/styles/reset.css';
import './src/styles/global.css';
import './src/styles/fonts.css';

const REGION = 'ap-southeast-1';

Amplify.configure({
  aws_project_region: REGION,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_cognito_identity_pool_id:
    'ap-southeast-1:6719f04a-e96f-4d92-b04f-df76fdb95fd6',
  aws_cognito_region: REGION,
  aws_user_pools_id: 'ap-southeast-1_wKgDSSzFi',
  aws_user_pools_web_client_id: 'najig9u2i5ur5e0qg3d8igqrb',
  aws_user_files_s3_bucket: 's3curus',
  aws_user_files_s3_bucket_region: REGION,
});

const wrapRootElement = Root;

const wrapPageElement = ({ element: page }) => {
  const { path } = page.props;
  // eslint-disable-next-line react/jsx-filename-extension
  if (/^\/blog/.test(path)) return <BlogLayout>{page}</BlogLayout>;
  return <SiteLayout>{page}</SiteLayout>;
};

export default {};

export { wrapRootElement, wrapPageElement };
