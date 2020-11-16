import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Menu, MenuItem, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { editMovie as editMovieAction, loadMore } from '../../redux/actions/action-creators';
import { isScrolledToTheBottom } from '../../shared/utils';
import { LOADING, MOVIE_FIELDS } from '../../shared/constants';
import MoviesFilter from '../MoviesFilter';
import MoviesSort from '../MoviesSort';
import Movie from '../Movie';
import AddEditMovieModal from '../AddEditMovieModal';
import DeleteMovieModal from '../DeleteMovieModal';

const MoviesList = ({
  movies, resultsCount, loading, ...props
}) => {
  const classes = useStyles();
  const [showEdit, setEditOpen] = useState(false);
  const [showDelete, setDeleteOpen] = useState(false);
  const [movie, setMovie] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const checkScrollAndLoadMore = () => {
    if (isScrolledToTheBottom() && !loading) {
      props.loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollAndLoadMore);

    return function cleanup() {
      window.removeEventListener('scroll', checkScrollAndLoadMore);
    };
  }, [props]);

  const closeModal = useCallback(() => {
    setEditOpen(false);
    setDeleteOpen(false);
  }, []);

  const openMenu = useCallback((selectedMovie, { target }) => {
    setMovie(selectedMovie);
    setMenuAnchor(target);
  }, []);

  const closeMenu = useCallback((action) => {
    setEditOpen(action === 'edit');
    setDeleteOpen(action === 'delete');
    setMenuAnchor(null);
  }, []);

  const openDeleteModal = useCallback(() => {
    closeMenu('delete');
  }, []);

  const openEditModal = useCallback(() => {
    closeMenu('edit');
  }, []);

  const editMovie = useCallback((selectedMovie) => {
    props.editMovie(selectedMovie);
  }, []);

  const moviesList = !movies.length
    ? (
      <div className={classes.emptyMoviesList}>
        <h1>No movies found</h1>
      </div>
    )
    : (
      <>
        <div className={classes.moviesCounter}>
          <strong>
            {`${resultsCount} `}
          </strong>
          movies found
        </div>
        <div className={classes.moviesList}>
          {movies.map((m) => (
            <Movie key={m[MOVIE_FIELDS.ID]} movie={m} onClick={openMenu} />
          ))}
        </div>
      </>
    );

  return (
    <>
      <div className={classes.flexSpaceBetween}>
        <MoviesFilter />
        <MoviesSort />
      </div>
      {moviesList}
      {loading ? <CircularProgress size="3rem" className={classes.loading} /> : null}
      <AddEditMovieModal
        open={showEdit}
        movie={movie}
        onClose={closeModal}
        onSubmit={editMovie}
      />
      <DeleteMovieModal open={showDelete} movieId={movie?.id} onClose={closeModal} />
      <Menu
        id="simple-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
      >
        <MenuItem onClick={openEditModal}>Edit</MenuItem>
        <MenuItem onClick={openDeleteModal}>Delete</MenuItem>
      </Menu>
    </>
  );
};

MoviesList.propTypes = {
  editMovie: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  resultsCount: PropTypes.number.isRequired,
};

const mapStateToProps = ({ movies, shared }) => ({
  resultsCount: movies.options.totalAmount,
  loading: shared.loading[LOADING.MOVIES_LIST],
});

const mapDispatchToProps = (dispatch) => ({
  editMovie: (movie) => dispatch(editMovieAction(movie)),
  loadMore: () => dispatch(loadMore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
