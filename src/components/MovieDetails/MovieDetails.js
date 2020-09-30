import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import { extractReleaseYear } from '../../shared/utils';
import { MOVIE_FIELDS } from '../../shared/constants';
import Image from '../Image';

export default function MovieDetails(movie) {
    const classes = useStyles();
    const releaseYear = useMemo(() => extractReleaseYear(movie[MOVIE_FIELDS.RELEASEDATE]), [movie[MOVIE_FIELDS.RELEASEDATE]]);
    const runtime = useMemo(() => movie[MOVIE_FIELDS.RUNTIME] ? `${movie[MOVIE_FIELDS.RUNTIME]} min` : '', [movie[MOVIE_FIELDS.RUNTIME]]);
    const ratingClasses = useMemo(() => {
        const score = Math.max(Math.ceil(movie[MOVIE_FIELDS.RATING] / 2), 1);
        const ratingClass = classes[`ratingColor${score}`];
        
        return `${classes.rating} ${classes.ml20} ${ratingClass}`;
    }, [movie[MOVIE_FIELDS.RATING]]);

    return <div className={classes.displayFlex}>
        <Image width={350} height={500} src={movie[MOVIE_FIELDS.POSTER]} alt={movie[MOVIE_FIELDS.TITLE]} />
        <div className={`${classes.movieInfo} ${classes.displayFlex} ${classes.ml20}`}>
            <div className={`${classes.infoRow} ${classes.displayFlex}`}>
                <Typography variant='h3'>{movie[MOVIE_FIELDS.TITLE]}</Typography>
                {movie[MOVIE_FIELDS.RATING]
                    ? <div><Typography variant='h5' className={ratingClasses}>{movie[MOVIE_FIELDS.RATING]}</Typography></div>
                    : null}
            </div>
            <Typography variant='subtitle1' className={`${classes.infoRow} ${classes.displayFlex}`}>{movie[MOVIE_FIELDS.GENRES]?.join(', ')}</Typography>
            <div className={`${classes.infoRow} ${classes.displayFlex}`}>
                <Typography variant='h6'>{releaseYear}</Typography>
                <Typography variant='h6' className={classes.ml20}>{runtime}</Typography>
            </div>
            <Typography variant='body1'>{movie[MOVIE_FIELDS.OVERVIEW]}</Typography>
        </div>
    </div>;
}

MovieDetails.propTypes = {
    [MOVIE_FIELDS.TITLE]: PropTypes.string,
    [MOVIE_FIELDS.OVERVIEW]: PropTypes.string,
    [MOVIE_FIELDS.POSTER]: PropTypes.string,
    [MOVIE_FIELDS.RATING]: PropTypes.number,
    [MOVIE_FIELDS.GENRES]: PropTypes.arrayOf(PropTypes.string),
    [MOVIE_FIELDS.RELEASEDATE]: PropTypes.string,
    [MOVIE_FIELDS.RUNTIME]: PropTypes.number,
};

MovieDetails.defaultProps = {
    [MOVIE_FIELDS.TITLE]: '<No title>',
    [MOVIE_FIELDS.OVERVIEW]: '<No description>',
    [MOVIE_FIELDS.POSTER]: '',
    [MOVIE_FIELDS.RATING]: 0,
    [MOVIE_FIELDS.GENRES]: [],
    [MOVIE_FIELDS.RELEASEDATE]: '',
    [MOVIE_FIELDS.RUNTIME]: 0,
};
