import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import Amplify, { Auth, Analytics } from 'aws-amplify';

import Tabs from './src/navigation/Tab';

console.disableYellowBox = true; // disable warnings for demo

const GRAPHQL_ENDPOINT =
  'https://fympi4jhonhwhi5fncqj7qsde4.appsync-api.ap-southeast-1.amazonaws.com/graphql';
const REGION = 'ap-southeast-1';

Amplify.configure({
  aws_project_region: REGION,
  aws_appsync_graphqlEndpoint: GRAPHQL_ENDPOINT,
  aws_appsync_region: REGION,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_cognito_identity_pool_id:
    'ap-southeast-1:6719f04a-e96f-4d92-b04f-df76fdb95fd6',
  aws_cognito_region: REGION,
  aws_user_pools_id: 'ap-southeast-1_wKgDSSzFi',
  aws_user_pools_web_client_id: 'najig9u2i5ur5e0qg3d8igqrb',
  aws_user_files_s3_bucket: 's3curus',
  aws_user_files_s3_bucket_region: REGION,
});

Analytics.disable(); // disabled analytics otherwise you get annoying messages

const appSyncSettings = {
  auth: {
    type: 'AMAZON_COGNITO_USER_POOLS',
    jwtToken: Auth.currentSession().then(
      (session) => console.log(Auth) || session.getAccessToken().getJwtToken()
    ),
  },
  url: GRAPHQL_ENDPOINT,
  region: REGION,
};

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPHQL_ENDPOINT,
  link: from([
    createAuthLink(appSyncSettings),
    split(
      (op) => {
        const { operation } = op.query.definitions[0];

        if (operation === 'subscription') {
          return false;
        }
        return true;
      },
      httpLink,
      createSubscriptionHandshakeLink(appSyncSettings, httpLink)
    ),
  ]),
});

export default function App() {
  return (
    <NativeBaseProvider>
      <ApolloProvider client={apolloClient}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ApolloProvider>
    </NativeBaseProvider>
  );
}
