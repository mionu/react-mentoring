import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { defaultProps } from '../AddEditMovieModal/constants';

export default function FormSelect({ options, ...props }) {
    return (<FormControl {...defaultProps}>
        <InputLabel shrink id={props.labelId}>{props.label}</InputLabel>
        <Select
            {...props}
        >
            <MenuItem disabled value=''>Select genre</MenuItem>
            {options.map((genre, i) =>
                <MenuItem key={i} value={genre}>{genre}</MenuItem>
            )}
        </Select>
        {props.error ?
            <FormHelperText>{props.helperText}</FormHelperText> :
            null
        }
    </FormControl>);
};

FormSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string,
    labelId: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};
