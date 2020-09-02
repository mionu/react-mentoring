import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { extractReleaseYear } from '../../shared/utils';
import Image from '../Image';

const useStyles = makeStyles({
    displayFlex: {
        display: 'flex',
    },
    ml20: {
        marginLeft: 20,
    },
    movieInfo: {
        flexDirection: 'column',
        flexGrow: 2,
    },
    infoRow: {
        paddingBottom: 10,
    },
    rating: {
        border: '1px solid #222',
        borderRadius: '50%',
        padding: 10,
        textAlign: 'center',
        width: 32,
    },
});

export default function MovieDetails(props) {
    const classes = useStyles();
    const releaseYear = useMemo(() => extractReleaseYear(props.movie.release_date), [props.movie.release_date]);
    const runtime = useMemo(() => props.movie.runtime ? `${props.movie.runtime} min` : '', [props.movie.runtime]);

    return <div className={classes.displayFlex}>
        <Image width={350} height={500} src={props.movie.poster_path} alt={props.movie.title} />
        <div className={`${classes.movieInfo} ${classes.displayFlex} ${classes.ml20}`}>
            <div className={`${classes.infoRow} ${classes.displayFlex}`}>
                <Typography variant='h3'>{props.movie.title}</Typography>
                {props.movie.vote_average
                    ? <div><Typography variant='h5' className={`${classes.rating} ${classes.ml20}`}>{props.movie.vote_average}</Typography></div>
                    : null}
            </div>
            <Typography variant='subtitle1' className={`${classes.infoRow} ${classes.displayFlex}`}>{props.movie.genres?.join(', ')}</Typography>
            <div className={`${classes.infoRow} ${classes.displayFlex}`}>
                <Typography variant='h6'>{releaseYear}</Typography>
                <Typography variant='h6' className={classes.ml20}>{runtime}</Typography>
            </div>
            <Typography variant='body1'>{props.movie.overview}</Typography>
        </div>
    </div>;
}

MovieDetails.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        overview: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        genres: PropTypes.arrayOf(PropTypes.string),
        release_date: PropTypes.string,
        runtime: PropTypes.number,
    }),
};

MovieDetails.defaultProps = {
    movie: {},
};
