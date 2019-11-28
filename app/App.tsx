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
