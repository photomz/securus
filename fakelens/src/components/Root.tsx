import React from 'react';
import { Provider } from 'react-redux';

import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Theme,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import fetch from 'isomorphic-fetch';
// import { createAuthLink } from 'aws-appsync-auth-link';
// import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
// import Amplify from 'aws-amplify';
// import { OperationDefinitionNode } from 'graphql';

import { setContext } from '@apollo/client/link/context';
import { store } from '../store/createStore';
import themeTemplate from '../styles/theme';
import SnackbarProvider from './Snackbar';
import { onError } from '@apollo/client/link/error';

// Amplify.configure({
//   aws_appsync_graphqlEndpoint: process.env.GATSBY_GRAPHQL_ENDPOINT!,
//   aws_appsync_region: process.env.GATSBY_AWS_REGION!,
//   aws_appsync_authenticationType: 'API_KEY',
//   aws_appsync_apiKey: process.env.GATSBY_APOLLO_API_KEY!,
// });

// const appSyncSettings = {
//   auth: {
//     type: 'API_KEY' as const,
//     apiKey: process.env.GATSBY_APOLLO_API_KEY!,
//     // jwtToken: Auth.currentSession().then((session) =>
//     //   session.getAccessToken().getJwtToken()
//     // ),
//   },
//   url: process.env.GATSBY_GRAPHQL_ENDPOINT!,
//   region: process.env.GATSBY_AWS_REGION!,
// };

const theme: Theme = createTheme(themeTemplate);

const httpLink = createHttpLink({
  uri: process.env.GATSBY_GRAPHQL_ENDPOINT!,
  fetch,
});

const errorLink = onError(({ response, operation }) => {
  if (operation.operationName === 'CLUSTER' && response?.errors) {
    response.errors = null;
  }
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'x-api-key': process.env.GATSBY_APOLLO_API_KEY!,
  },
}));

const apolloClient = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  uri: process.env.GATSBY_GRAPHQL_ENDPOINT!,
  cache: new InMemoryCache(),
});

// const httpLink = new HttpLink({
//   uri: process.env.GATSBY_GRAPHQL_ENDPOINT!,
// });
// const apolloClient = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: process.env.GATSBY_GRAPHQL_ENDPOINT!,
//   link: from([
//     createAuthLink(appSyncSettings),
//     split(
//       (op) => {
//         const { operation } = op.query
//           .definitions[0] as OperationDefinitionNode;

//         if (operation === 'subscription') {
//           return false;
//         }
//         return true;
//       },
//       httpLink,
//       createSubscriptionHandshakeLink(appSyncSettings, httpLink)
//     ),
//   ]),
// });

const Root: React.FC = ({ element }: { element: React.ReactChild }) => (
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <StyledThemeProvider theme={(theme as unknown) as DefaultTheme}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider>{element}</SnackbarProvider>
          </MuiThemeProvider>
        </StyledThemeProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

export default Root;
