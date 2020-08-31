import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import _ from 'lodash';
import staticGenres from '../../shared/static-genres';
import BasicMovieModal from '../BasicMovieModal';

const defaultState = {
    title: '',
    releaseDate: null,
    url: '',
    genres: [],
    overview: '',
    runtime: '',
};

const defaultProps = {
    variant: 'outlined',
    margin: 'dense',
    type: 'text',
    fullWidth: true,
};

export default function AddEditModal(props) {
    const onSubmit = () => {
        props.onSubmit({
            ...movie,
            ...(props.movie?.id ? { id: props.movie.id } : {}),
        });
        onClose();
    }

    const onReset = () => {
        setMovie(props.movie || defaultState);
    }

    const onClose = () => {
        onReset();
        props.onClose();
    }

    const handleInput = (control, event) => {
        setMovie({
            ...movie,
            [control]: control === 'releaseDate' ? event.format('MM-DD-YYYY') : event.target.value,
        });
    }

    const that = this;
    const [movie, setMovie] = useState(props.movie || defaultState);
    useEffect(() => {
        setMovie(props.movie || defaultState);
    }, [props]);

    return <MuiPickersUtilsProvider utils={MomentUtils}>
        <BasicMovieModal
            headerText={props.movie ? 'Edit movie' : 'Add movie'}
            open={props.open}
            onClose={props.onClose}
            onSubmit={onSubmit}
            onReset={onReset}
        >
            {props.movie ?
            <TextField
                {...defaultProps}
                InputProps={{
                    readOnly: true,
                }}
                label='ID'
                value={props.movie.id}
            />
            : null}
            <TextField
                {...defaultProps}
                autoFocus
                label='Title'
                value={movie?.title}
                onChange={handleInput.bind(that, 'title')}
            />
            <DatePicker
                {...defaultProps}
                label='Release date'
                inputVariant='outlined'
                variant='inline'
                format='MM-DD-YYYY'
                value={movie?.releaseDate}
                onChange={handleInput.bind(that, 'releaseDate')}
            />
            <TextField
                {...defaultProps}
                label='Movie url'
                value={movie?.url}
                onChange={handleInput.bind(that, 'url')}
            />
            <FormControl {...defaultProps}>
                <InputLabel shrink id='genres-select'>Genre</InputLabel>
                <Select
                    labelId='genres-select'
                    multiple
                    displayEmpty
                    renderValue={(selected) => {
                        const filtered = selected.filter(s => staticGenres[s]);
                        if (filtered.length === 0) {
                                return 'Select genre';
                            }
                
                        return filtered.map(s => staticGenres[s]).join(', ');
                        }
                    }
                    value={movie?.genres}
                    onChange={handleInput.bind(that, 'genres')}
                >
                    <MenuItem disabled value=''>Select genre</MenuItem>
                    {staticGenres.map((genre, i) =>
                        <MenuItem key={i} value={i}>{genre}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <TextField
                {...defaultProps}
                label='Overview'
                value={movie?.overview}
                onChange={handleInput.bind(that, 'overview')}
            />
            <TextField
                {...defaultProps}
                label='Runtime'
                value={movie?.runtime}
                onChange={handleInput.bind(that, 'runtime')}
            />
        </BasicMovieModal>
    </MuiPickersUtilsProvider>;
}

AddEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    movie: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        releaseDate: PropTypes.string,
        url: PropTypes.string,
        genre: PropTypes.number,
        overview: PropTypes.string,
        runtime: PropTypes.number,
    }),
}
