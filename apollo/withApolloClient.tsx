
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import { getDataFromTree } from 'react-apollo';
import { initApollo } from './initApollo';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import get from 'lodash/get';
import Head from 'next/head';
import React from 'react';


interface IApolloProps {
  apolloState?: NormalizedCacheObject;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}
const withApolloClient = (App: any) => {
  return class WithApollo extends React.Component<IApolloProps & AppInitialProps & AppProps> {
    public static displayName = 'withApolloClient(App)';
    public apolloClient: ApolloClient<NormalizedCacheObject>;

    public static async getInitialProps(appCtx: AppContext) {
      const { Component, router, ctx } = appCtx;

      let appProps: any = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appCtx);
      }

      appProps = {
        ...appProps,
        ...{ pageProps: appProps && appProps.pageProps ? appProps.pageProps : {} },
        renderError: null,
      };
      
      const apolloClient = initApollo(null, ctx);
      const apolloState = { data: {} };

      try {
        // Run all GraphQL queries in the component tree
        // and extract the resulting data
        // Run all GraphQL queries
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloState={apolloState}
            apolloClient={apolloClient}
          />,
        );
      } catch (error) {
        console.error('Error while running `getDataFromTree`', error);
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      apolloState.data = apolloClient.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    constructor(props: IApolloProps & AppInitialProps & AppProps) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      // https://github.com/zeit/next.js/issues/7418 - problem with sending cookies on SSR.
      this.apolloClient = props.apolloClient || initApollo(get(props, 'apolloState.data', undefined));
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};

export {
  withApolloClient,
}
