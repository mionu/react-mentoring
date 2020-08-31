import React from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

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
    moviePoster: {
        position: 'relative',
        width: 300,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 600,
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
    const releaseYear = props.movie.releaseDate.split('-')[2];

    const handleClick = (movie, event) => {
        props.onClick(movie, event);
    }

    return <div>
        <div className={classes.moviePoster}>
            <div className={classes.posterOverlay}>
                <IconButton className={classes.moreIcon} onClick={handleClick.bind(that, props.movie)} >
                    <MoreVertIcon fontSize='large' />
                </IconButton>
            </div>
            <img width='300' height='400' src={props.movie.poster} alt={props.movie.title}></img>
        </div>
        <div className={classes.movieTitleRow}>
            <div className={classes.movieTitle}>{props.movie.title}</div>
            <div className={classes.releaseDate}>{releaseYear}</div>
        </div>
        {props.movie.genres.join(', ')}
    </div>;
}

Movie.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string,
        releaseDate: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string),
    }),
};