import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteMovie } from '../../redux/actions/action-creators';
import BasicMovieModal from '../BasicMovieModal';

const DeleteMovieModal = ({
  open, onClose, movieId, ...props
}) => {
  const onSubmit = useCallback(() => {
    props.delete(movieId);
    onClose();
  }, [movieId]);

  return (
    <BasicMovieModal
      headerText="Delete movie"
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      Are you sure you want to delete this movie?
    </BasicMovieModal>
  );
};

DeleteMovieModal.propTypes = {
  delete: PropTypes.func.isRequired,
  movieId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

DeleteMovieModal.defaultProps = {
  movieId: 0,
};

const mapDispatchToProps = (dispatch) => ({
  delete: (id) => dispatch(deleteMovie(id)),
});

export default connect(null, mapDispatchToProps)(DeleteMovieModal);
