import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { extractReleaseYear } from '../../shared/utils';
import Image from '../Image/Image';

const useStyles = makeStyles({
    moreIcon: {
        border: '1px solid #333',
        borderRadius: '50%',
        marginRight: 5,
        marginTop: 5,
        right: 0,
        padding: 7,
        position: 'absolute',
        top: 0,
    },
    movie: {
        width: 300,
    },
    moviePoster: {
        position: 'relative',
        width: 300,
    },
    movieTitleRow: {
        alignItems: 'baseline',
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 7,
        paddingTop: 5,
    },
    posterOverlay: {
        height: '100%',
        opacity: 0,
        position: 'absolute',
        width: '100%',

        '&:hover': {
            opacity: 1,
            transition: 'opacity 0.3s',
        },
    },
    releaseDate: {
        border: '1px solid #555',
        borderRadius: 5,
        padding: '3px 10px',
    }
});

export default function Movie(props) {
    const classes = useStyles();
    const that = this;
    const releaseYear = useMemo(() => extractReleaseYear(props.movie.release_date), [props.movie.release_date]);

    const handleClick = (movie, event) => {
        props.onClick(movie, event);
        event.preventDefault();
    }

    return <div className={classes.movie}>
        <div className={classes.moviePoster}>
            <Link to={`/movie/${props.movie.id}`} className={classes.posterOverlay}>
                <IconButton className={classes.moreIcon} onClick={handleClick.bind(that, props.movie)} >
                    <MoreVertIcon fontSize='large' />
                </IconButton>
            </Link>
            <Image src={props.movie.poster_path} alt={props.movie.title} />
        </div>
        <div className={classes.movieTitleRow}>
            <Typography variant='h6'>{props.movie.title}</Typography>
            <div className={classes.releaseDate}>{releaseYear}</div>
        </div>
        {props.movie.genres.join(', ')}
    </div>;
}

Movie.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        release_date: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string),
    }),
};
