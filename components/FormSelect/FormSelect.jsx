import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, MenuItem, FormHelperText,
} from '@material-ui/core';
import { defaultProps } from '../AddEditMovieModal/constants';

export default function FormSelect({ options, ...props }) {
  /* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment */
  return (
    <FormControl {...defaultProps}>
      <InputLabel shrink id={props.labelId}>{props.label}</InputLabel>
      <Select
        {...props}
      >
        <MenuItem disabled value="">Select genre</MenuItem>
        {options.map((genre) => <MenuItem key={genre} value={genre}>{genre}</MenuItem>)}
      </Select>
      {props.error
        ? <FormHelperText>{props.helperText}</FormHelperText>
        : null}
    </FormControl>
  );
  /* eslint-enable react/jsx-props-no-spreading, react/destructuring-assignment */
}

FormSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

FormSelect.defaultProps = {
  error: false,
  helperText: '',
  value: [],
};
