import React from 'react';
import Head from 'next/head';
import Home from '../containers/Home';

export default function Index() {
  /* eslint-disable react/jsx-filename-extension */
  return (
    <>
      <Head>
        <title>Main</title>
      </Head>
      <Home />
    </>
  );
  /* eslint-enable react/jsx-filename-extension */
}
