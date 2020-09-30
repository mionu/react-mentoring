import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './styles';
import { extractReleaseYear } from '../../shared/utils';
import { MOVIE_FIELDS } from '../../shared/constants';
import Image from '../Image/Image';

export default function Movie(props) {
    const classes = useStyles();
    const that = this;
    const releaseYear = useMemo(
        () => extractReleaseYear(props.movie[MOVIE_FIELDS.RELEASEDATE]),
        [props.movie[MOVIE_FIELDS.RELEASEDATE]]
    );

    const handleClick = (movie, event) => {
        props.onClick(movie, event);
        event.preventDefault();
    }

    return <div className={classes.movie}>
        <div className={classes.moviePoster}>
            <Link to={`/film/${props.movie[MOVIE_FIELDS.ID]}`} className={classes.posterOverlay}>
                <IconButton className={classes.moreIcon} onClick={handleClick.bind(that, props.movie)} >
                    <MoreVertIcon fontSize='large' />
                </IconButton>
            </Link>
            <Image src={props.movie[MOVIE_FIELDS.POSTER]} alt={props.movie[MOVIE_FIELDS.TITLE]} />
        </div>
        <div className={classes.movieTitleRow}>
            <Typography variant='h6'>{props.movie[MOVIE_FIELDS.TITLE]}</Typography>
            <div className={classes.releaseDate}>{releaseYear}</div>
        </div>
        {props.movie[MOVIE_FIELDS.GENRES].join(', ')}
    </div>;
}

Movie.propTypes = {
    movie: PropTypes.shape({
        [MOVIE_FIELDS.TITLE]: PropTypes.string.isRequired,
        [MOVIE_FIELDS.POSTER]: PropTypes.string,
        [MOVIE_FIELDS.RELEASEDATE]: PropTypes.string.isRequired,
        [MOVIE_FIELDS.GENRES]: PropTypes.arrayOf(PropTypes.string),
    }),
};
