import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import { extractReleaseYear } from '../../shared/utils';
import { MOVIE_FIELDS } from '../../shared/constants';
import Image from '../Image';

export default function MovieDetails(props) {
    const classes = useStyles();
    const releaseYear = useMemo(() => extractReleaseYear(props.movie[MOVIE_FIELDS.RELEASEDATE]), [props.movie[MOVIE_FIELDS.RELEASEDATE]]);
    const runtime = useMemo(() => props.movie[MOVIE_FIELDS.RUNTIME] ? `${props.movie[MOVIE_FIELDS.RUNTIME]} min` : '', [props.movie[MOVIE_FIELDS.RUNTIME]]);
    const ratingClasses = useMemo(() => {
        const score = Math.max(Math.ceil(props.movie[MOVIE_FIELDS.RATING] / 2), 1);
        const ratingClass = classes[`ratingColor${score}`];
        
        return `${classes.rating} ${classes.ml20} ${ratingClass}`;
    }, [props.movie[MOVIE_FIELDS.RATING]]);

    return <div className={classes.displayFlex}>
        <Image width={350} height={500} src={props.movie[MOVIE_FIELDS.POSTER]} alt={props.movie[MOVIE_FIELDS.TITLE]} />
        <div className={`${classes.movieInfo} ${classes.displayFlex} ${classes.ml20}`}>
            <div className={`${classes.infoRow} ${classes.displayFlex}`}>
                <Typography variant='h3'>{props.movie[MOVIE_FIELDS.TITLE]}</Typography>
                {props.movie[MOVIE_FIELDS.RATING]
                    ? <div><Typography variant='h5' className={ratingClasses}>{props.movie[MOVIE_FIELDS.RATING]}</Typography></div>
                    : null}
            </div>
            <Typography variant='subtitle1' className={`${classes.infoRow} ${classes.displayFlex}`}>{props.movie[MOVIE_FIELDS.GENRES]?.join(', ')}</Typography>
            <div className={`${classes.infoRow} ${classes.displayFlex}`}>
                <Typography variant='h6'>{releaseYear}</Typography>
                <Typography variant='h6' className={classes.ml20}>{runtime}</Typography>
            </div>
            <Typography variant='body1'>{props.movie[MOVIE_FIELDS.OVERVIEW]}</Typography>
        </div>
    </div>;
}

MovieDetails.propTypes = {
    movie: PropTypes.shape({
        [MOVIE_FIELDS.TITLE]: PropTypes.string,
        [MOVIE_FIELDS.OVERVIEW]: PropTypes.string,
        [MOVIE_FIELDS.POSTER]: PropTypes.string,
        [MOVIE_FIELDS.RATING]: PropTypes.number,
        [MOVIE_FIELDS.GENRES]: PropTypes.arrayOf(PropTypes.string),
        [MOVIE_FIELDS.RELEASEDATE]: PropTypes.string,
        [MOVIE_FIELDS.RUNTIME]: PropTypes.number,
    }),
};

MovieDetails.defaultProps = {
    movie: {},
};
