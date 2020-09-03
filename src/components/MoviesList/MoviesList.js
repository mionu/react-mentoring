import React, { useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MoviesFilter from '../MoviesFilter';
import MoviesSort from '../MoviesSort';
import Movie from '../Movie/Movie';
import AddEditModal from '../AddEditModal';
import DeleteMovieModal from '../DeleteMovieModal';
import store from '../../shared/store';

const useStyles = makeStyles({
    emptyMoviesList: {
        marginLeft: 'auto',
        marginTop: 50,
        width: '60%',
    },
    flexSpaceBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    moviesCounter: {
        margin: 15,
    },
});

export default function MoviesList(props) {
    const that = this;
    const classes = useStyles();
    const [showEdit, setEditOpen] = useState(false);
    const [showDelete, setDeleteOpen] = useState(false);
    const [movie, setMovie] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);

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
        store.dispatch({ type: 'EDIT_MOVIE', data: movie });
    }

    const movies = !props.movies.length ?
    <div className={classes.emptyMoviesList}>
        <h1>No movies found</h1>
    </div> :
    <>
    <div className={classes.moviesCounter}><strong>{props.movies.length}</strong> movies found</div>
    <div className={classes.flexSpaceBetween}>{
        props.movies.map(movie => {
            return <Movie key={movie.id} movie={movie} onClick={openMenu} />
        })
    }</div>
    </>;

    return <>
        <div className={classes.flexSpaceBetween}>
            <MoviesFilter />
            <MoviesSort />
        </div>
        {movies}
        <AddEditModal
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
}
