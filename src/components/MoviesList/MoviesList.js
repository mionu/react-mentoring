import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { editMovie, loadMore } from '../../redux/actions/action-creators';
import { isScrolledToTheBottom } from '../../shared/utils';
import { MOVIE_FIELDS } from '../../shared/constants';
import MoviesFilter from '../MoviesFilter';
import MoviesSort from '../MoviesSort';
import Movie from '../Movie';
import AddEditMovieModal from '../AddEditMovieModal';
import DeleteMovieModal from '../DeleteMovieModal';

const MoviesList = (props) => {
    const that = this;
    const classes = useStyles();
    const [showEdit, setEditOpen] = useState(false);
    const [showDelete, setDeleteOpen] = useState(false);
    const [movie, setMovie] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);

    const checkScrollAndLoadMore = () => {
        if (isScrolledToTheBottom()) {
            props.loadMore();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkScrollAndLoadMore);

        return function cleanup() {
            window.removeEventListener('scroll', checkScrollAndLoadMore);
        }
    }, [props]);

    const closeModal = () => {
        setEditOpen(false);
        setDeleteOpen(false);
    }

    const openMenu = (movie, { target }) => {
        setMovie(movie);
        setMenuAnchor(target);
    }

    const closeMenu = (action) => {
        setEditOpen(action === 'edit');
        setDeleteOpen(action === 'delete');
        setMenuAnchor(null);
    }

    const editMovie = (movie) => {
        props.editMovie(movie);
    }

    const movies = !props.movies.length ?
        <div className={classes.emptyMoviesList}>
            <h1>No movies found</h1>
        </div> :
        <>
        <div className={classes.moviesCounter}><strong>{props.resultsCount}</strong> movies found</div>
        <div className={classes.moviesList}>{
            props.movies.map(movie => {
                return <Movie key={movie[MOVIE_FIELDS.ID]} movie={movie} onClick={openMenu} />
            })
        }</div>
        </>;

    return <>
        <div className={classes.flexSpaceBetween}>
            <MoviesFilter />
            <MoviesSort />
        </div>
        {movies}
        <AddEditMovieModal
            open={showEdit}
            movie={movie}
            onClose={closeModal}
            onSubmit={editMovie}
        />
        <DeleteMovieModal open={showDelete} movieId={movie?.id} onClose={closeModal} />
        <Menu
            id='simple-menu'
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={closeMenu.bind(that, null)}
        >
            <MenuItem onClick={closeMenu.bind(that, 'edit')}>Edit</MenuItem>
            <MenuItem onClick={closeMenu.bind(that, 'delete')}>Delete</MenuItem>
        </Menu>
    </>;
}

MoviesList.propTypes = {
    movies: PropTypes.array.isRequired,
};

MoviesList.defaultProps = {
    movies: [],
};

const mapStateToProps = ({ moviesReducer }) => ({
    resultsCount: moviesReducer.options.totalAmount,
});

const mapDispatchToProps = (dispatch) => ({
    editMovie: (movie) => dispatch(editMovie(movie)),
    loadMore: () => dispatch(loadMore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
