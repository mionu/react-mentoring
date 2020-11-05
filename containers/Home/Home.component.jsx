import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import ErrorBoundary from '../../components/ErrorBoundary';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Search from '../../components/Search';
import MoviesList from '../../components/MoviesList';

export default function Home({ loading, movies }) {
  return (
    <ErrorBoundary>
      <Loading visible={loading} />
      <Header />
      <Container>
        <Search />
        <MoviesList movies={movies} />
      </Container>
    </ErrorBoundary>
  );
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
