import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteMovie } from '../../redux/actions/action-creators';
import BasicMovieModal from '../BasicMovieModal';

const DeleteMovieModal = (props) => {
    function onSubmit() {
        props.delete(props.movieId);
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
    movieId: PropTypes.number,
}

const mapDispatchToProps = (dispatch) => ({
    delete: (id) => dispatch(deleteMovie(id)),
});

export default connect(null, mapDispatchToProps)(DeleteMovieModal);
