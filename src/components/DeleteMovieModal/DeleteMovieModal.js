import React from 'react';
import PropTypes from 'prop-types';
import store from '../../shared/store';
import BasicMovieModal from '../BasicMovieModal';

export default function DeleteMovieModal(props) {
    const that = this;

    function onSubmit() {
        store.dispatch({ type: 'DELETE_MOVIE', data: props.movieId });
        props.onClose();
    }

    return <BasicMovieModal
        headerText='Delete movie'
        open={props.open}
        onClose={props.onClose}
        onSubmit={onSubmit}
    >Are you sure you want to delete this movie?</BasicMovieModal>
}

DeleteMovieModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    movieId: PropTypes.string.isRequired,
}