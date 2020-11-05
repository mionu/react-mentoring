import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withObservable } from 'next-redux-observable';
import { wrapper } from '../redux/store';
import rootEpic from '../redux/epics';
import '../styles/global.scss';

function App(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  /* eslint-disable react/jsx-filename-extension, react/jsx-props-no-spreading */
  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  /* eslint-enable react/jsx-filename-extension, react/jsx-props-no-spreading */
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return { pageProps };
};

const connected = wrapper.withRedux(withObservable(rootEpic)(App));

export default connected;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};
