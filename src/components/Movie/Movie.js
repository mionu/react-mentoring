import React from 'react';
import './Movie.scss';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    moreIcon: {
        border: '1px solid #000',
        borderRadius: '50%',
        cursor: 'pointer',
        marginRight: 5,
        marginTop: 5,
        right: 0,
        position: 'absolute',
        top: 0,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 600,
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

    return <div class='movie'>
        <div className='movie-poster'>
            <div className={classes.posterOverlay}>
                <MoreVertIcon className={classes.moreIcon} fontSize='large' />
            </div>
            <img width='300' height='400' src={props.movie.poster} alt={props.movie.title}></img>
        </div>
        <div className='movie-title-row'>
            <div className={classes.movieTitle}>{props.movie.title}</div>
            <div className={classes.releaseDate}>{props.movie.releaseDate}</div>
        </div>
        {props.movie.genres.join(', ')}
    </div>;
}

Movie.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string,
        releaseDate: PropTypes.number.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string),
    }),
};