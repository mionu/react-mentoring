import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { setOptions } from '../../redux/actions/action-creators';
import Home from '../../containers/Home';

function Search({ search, ...props }) {
  useEffect(() => {
    props.searchMovies(search);
  }, [search]);

  return (
    <>
      <Head>
        <title>
          Search for
          {` ${search}`}
        </title>
      </Head>
      <Home />
    </>
  );
}

Search.getInitialProps = (ctx) => ({ search: ctx.query.query });

Search.propTypes = {
  search: PropTypes.string.isRequired,
  searchMovies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  searchMovies: (search) => dispatch(setOptions({ search })),
});

export default connect(null, mapDispatchToProps)(Search);
