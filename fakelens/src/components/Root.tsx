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

import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { store } from '../store/createStore';
import themeTemplate from '../styles/theme';
import SnackbarProvider from './Snackbar';

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

const Root: React.FC = ({ element }: { element: React.ReactChild }) => (
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <StyledThemeProvider theme={theme as unknown as DefaultTheme}>
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
