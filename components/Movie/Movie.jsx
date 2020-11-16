import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './styles';
import { extractReleaseYear } from '../../shared/utils';
import { MOVIE_FIELDS } from '../../shared/constants';
import Image from '../Image';

export default function Movie({ movie, onClick }) {
  const classes = useStyles();
  const releaseYear = useMemo(
    () => extractReleaseYear(movie[MOVIE_FIELDS.RELEASEDATE]),
    [movie[MOVIE_FIELDS.RELEASEDATE]],
  );

  const handleClick = useCallback((event) => {
    onClick(movie, event);
    event.preventDefault();
  }, []);

  return (
    <div className={classes.movie}>
      <div className={classes.moviePoster}>
        <Link href={`/film/${movie[MOVIE_FIELDS.ID]}`}>
          <div className={classes.posterOverlay}>
            <IconButton className={classes.moreIcon} onClick={handleClick}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
          </div>
        </Link>
        <Image src={movie[MOVIE_FIELDS.POSTER]} alt={movie[MOVIE_FIELDS.TITLE]} />
      </div>
      <div className={classes.movieTitleRow}>
        <Typography variant="h6">{movie[MOVIE_FIELDS.TITLE]}</Typography>
        <div className={classes.releaseDate}>{releaseYear}</div>
      </div>
      {movie[MOVIE_FIELDS.GENRES].join(', ')}
    </div>
  );
}

Movie.propTypes = {
  movie: PropTypes.shape({
    [MOVIE_FIELDS.TITLE]: PropTypes.string.isRequired,
    [MOVIE_FIELDS.POSTER]: PropTypes.string,
    [MOVIE_FIELDS.RELEASEDATE]: PropTypes.string.isRequired,
    [MOVIE_FIELDS.GENRES]: PropTypes.arrayOf(PropTypes.string),
  }),
  onClick: PropTypes.func.isRequired,
};

Movie.defaultProps = {
  movie: {},
};
