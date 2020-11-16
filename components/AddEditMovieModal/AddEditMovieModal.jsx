import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { GENRES, MOVIE_FIELDS } from '../../shared/constants';
import { defaultProps, defaultState } from './constants';
import { generateFormControlProps, validationSchema } from './form';
import BasicMovieModal from '../BasicMovieModal';
import FormSelect from '../FormSelect';

const getMovieProps = (movie, id) => ({
  ...movie,
  [MOVIE_FIELDS.RUNTIME]: Number(movie[MOVIE_FIELDS.RUNTIME]),
  [MOVIE_FIELDS.TAGLINE]: movie[MOVIE_FIELDS.TAGLINE] || movie[MOVIE_FIELDS.TITLE],
  ...(id ? { [MOVIE_FIELDS.ID]: id } : {}),
});

export default function AddEditMovieModal({ movie, open, ...props }) {
  const formik = useFormik({
    initialValues: movie || defaultState,
    validationSchema,
    // eslint-disable-next-line no-use-before-define
    onSubmit: (values) => onSubmit(values),
    enableReinitialize: true,
  });

  const onSubmit = useCallback((values) => {
    props.onSubmit(getMovieProps(values, movie?.[MOVIE_FIELDS.ID]));
    // eslint-disable-next-line no-use-before-define
    onClose();
  }, []);

  const onReset = useCallback(() => {
    formik.resetForm();
  }, []);

  const onClose = useCallback(() => {
    onReset();
    props.onClose();
  }, []);

  const controls = generateFormControlProps(formik);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <BasicMovieModal
      headerText={movie ? 'Edit movie' : 'Add movie'}
      open={open}
      valid={formik.isValid}
      onClose={onClose}
      onSubmit={formik.submitForm}
      onReset={onReset}
    >
      {movie?.[MOVIE_FIELDS.ID]
        ? (
          <TextField
            {...defaultProps}
            {...controls[MOVIE_FIELDS.ID].props}
            value={movie[MOVIE_FIELDS.ID]}
          />
        )
        : null}
      <TextField
        {...defaultProps}
        {...controls[MOVIE_FIELDS.TITLE].props}
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          {...defaultProps}
          {...controls[MOVIE_FIELDS.RELEASEDATE].props}
        />
      </MuiPickersUtilsProvider>
      <TextField
        {...defaultProps}
        {...controls[MOVIE_FIELDS.POSTER].props}
      />
      <FormSelect
        {...controls[MOVIE_FIELDS.GENRES].props}
        options={GENRES}
      />
      <TextField
        {...defaultProps}
        {...controls[MOVIE_FIELDS.OVERVIEW].props}
      />
      <TextField
        {...defaultProps}
        {...controls[MOVIE_FIELDS.RUNTIME].props}
      />
    </BasicMovieModal>
  );
  /* eslint-enable react/jsx-props-no-spreading */
}

AddEditMovieModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    [MOVIE_FIELDS.ID]: PropTypes.number,
    [MOVIE_FIELDS.TITLE]: PropTypes.string,
    [MOVIE_FIELDS.RELEASEDATE]: PropTypes.string,
    [MOVIE_FIELDS.POSTER]: PropTypes.string,
    [MOVIE_FIELDS.GENRES]: PropTypes.arrayOf(PropTypes.string),
    [MOVIE_FIELDS.OVERVIEW]: PropTypes.string,
    [MOVIE_FIELDS.RUNTIME]: PropTypes.number,
  }),
};

AddEditMovieModal.defaultProps = {
  movie: {},
};
