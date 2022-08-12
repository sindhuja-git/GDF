import React, { FC, ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { nanoid } from 'nanoid';

import Auth from 'utils/auth/legacy/Auth';
import appProperties from '../../../../properties/application';

const httpLink = createHttpLink({
  uri: appProperties().services.aggregator.url,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: Auth.authorizationHeader(),
  },
}));

/**
 * We created a separate appHeaderLink for the purposes of separation of concerns.
 * This function should have any headers required by the application agnostic of authentication.
 */
const appHeaderLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'x-hp-request-id': nanoid(),
  },
}));

export const client = new ApolloClient({
  link: appHeaderLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          launchedGroup: {
            // GDF Launched Group Info
            merge(existing = {}, incoming: any) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
});

interface AuthenticatedAppProviderProps {
  children: ReactNode;
}

/**
 * The AuthenticatedAppProvider contains any wrappers required for running our AuthenticatedApp in a self contained fashion.
 * This has all framework definitions agnostic to the Application itself.
 */
const AuthenticatedAppProvider: FC<AuthenticatedAppProviderProps> = ({
  children,
}) => {
  return (
    <HelmetProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </HelmetProvider>
  );
};

export default AuthenticatedAppProvider;
