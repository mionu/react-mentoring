import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { Container, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ErrorBoundary from '../../components/ErrorBoundary';
import Loading from '../../components/Loading';
import MoviesList from '../../components/MoviesList';
import MovieDetails from '../../components/MovieDetails';

const useStyles = makeStyles({
  searchIcon: {
    left: '95%',
    position: 'relative',
  },
});

export default function MovieComponent({ loading, movie, moviesList }) {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movie?.id]);

  return (
    <ErrorBoundary>
      <Loading visible={loading} />
      <IconButton className={classes.searchIcon}><Link href="/"><SearchIcon fontSize="large" /></Link></IconButton>
      <Container>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <MovieDetails {...movie} />
        <MoviesList movies={moviesList} />
      </Container>
    </ErrorBoundary>
  );
}

MovieComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  movie: PropTypes.object.isRequired,
  moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
