import React from 'react'
import { ApolloProvider } from "react-apollo";
import App, { AppProps, AppInitialProps, AppContext} from 'next/app';
import { withApolloClient } from '../apollo/withApolloClient';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

interface IApolloProps {
  apolloState?: NormalizedCacheObject;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

class BaseApp extends App<AppInitialProps & AppProps & IApolloProps >  {
  static async getInitialProps(context: AppContext) {
    //
    // Use getInitialProps as a step in the lifecycle when
    // we can initialize our store

    const isServer = typeof window === 'undefined'
    // const store = initializeStore(isServer)
    //
    // Check whether the page being rendered by the App has a
    // static getInitialProps method and if so call it
    //
    let pageProps = {}
    if (App.getInitialProps) {
      pageProps = await App.getInitialProps(context)
    }
    return {
      initialState: {},
      isServer,
      pageProps,
    }
  }

  constructor(props: AppInitialProps & AppProps & IApolloProps) {
    super(props)
  }

  public render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <>
          <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
          </ApolloProvider>
      </>
    )
  }
}
const decorate = (app: React.ElementType) => withApolloClient(app);
const MyApp = decorate(BaseApp);
export {
  MyApp,
}
