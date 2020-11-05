import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import { extractReleaseYear } from '../../shared/utils';
import { MOVIE_FIELDS } from '../../shared/constants';
import Image from '../Image';

export default function MovieDetails(movie) {
  const classes = useStyles();
  const releaseYear = useMemo(() => extractReleaseYear(
    movie[MOVIE_FIELDS.RELEASEDATE],
  ), [movie[MOVIE_FIELDS.RELEASEDATE]]);
  // eslint-disable-next-line no-confusing-arrow
  const runtime = useMemo(() => movie[MOVIE_FIELDS.RUNTIME] ? `${movie[MOVIE_FIELDS.RUNTIME]} min` : '', [movie[MOVIE_FIELDS.RUNTIME]]);
  const ratingClasses = useMemo(() => {
    const score = Math.max(Math.ceil(movie[MOVIE_FIELDS.RATING] / 2), 1);
    const ratingClass = classes[`ratingColor${score}`];

    return `${classes.rating} ${classes.ml20} ${ratingClass}`;
  }, [movie[MOVIE_FIELDS.RATING]]);

  return (
    <div className={classes.displayFlex}>
      <Image
        width={350}
        height={500}
        src={movie[MOVIE_FIELDS.POSTER]}
        alt={movie[MOVIE_FIELDS.TITLE]}
      />
      <div className={`${classes.movieInfo} ${classes.displayFlex} ${classes.ml20}`}>
        <div className={`${classes.infoRow} ${classes.displayFlex}`}>
          <Typography variant="h3">{movie[MOVIE_FIELDS.TITLE]}</Typography>
          {movie[MOVIE_FIELDS.RATING]
            ? <div><Typography variant="h5" className={ratingClasses}>{movie[MOVIE_FIELDS.RATING]}</Typography></div>
            : null}
        </div>
        <Typography variant="subtitle1" className={`${classes.infoRow} ${classes.displayFlex}`}>{movie[MOVIE_FIELDS.GENRES]?.join(', ')}</Typography>
        <div className={`${classes.infoRow} ${classes.displayFlex}`}>
          <Typography variant="h6">{releaseYear}</Typography>
          <Typography variant="h6" className={classes.ml20}>{runtime}</Typography>
        </div>
        <Typography variant="body1">{movie[MOVIE_FIELDS.OVERVIEW]}</Typography>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  title: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.string),
  release_date: PropTypes.string,
  runtime: PropTypes.number,
  /* eslint-enable react/no-unused-prop-types */
};

MovieDetails.defaultProps = {
  title: '<No title>',
  overview: '<No description>',
  poster_path: '',
  vote_average: 0,
  genres: [],
  release_date: '',
  runtime: 0,
};
