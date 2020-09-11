import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import _ from 'lodash';
import BasicMovieModal from '../BasicMovieModal';
import { GENRES } from '../../shared/constants';

const defaultState = {
    title: '',
    release_date: null,
    poster_path: '',
    genres: [],
    overview: '',
    runtime: 0,
};

const defaultProps = {
    variant: 'outlined',
    margin: 'dense',
    type: 'text',
    fullWidth: true,
};

const getUpdate = (control, event) => {
    if (control === 'release_date') {
        return { [control]: event.format('YYYY-MM-DD') };
    }
    
    return { [control]: event.target.value };
};

const getMovieProps = (movie, id) => {
    return {
        ...movie,
        runtime: Number(movie.runtime),
        tagline: movie.tagline || '',
        ...(id ? { id } : {}),
    };
}

export default function AddEditMovieModal(props) {
    const onSubmit = () => {
        props.onSubmit(getMovieProps(movie, props.movie?.id));
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
            ...getUpdate(control, event),
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
                format='YYYY-MM-DD'
                value={movie?.release_date}
                onChange={handleInput.bind(that, 'release_date')}
            />
            <TextField
                {...defaultProps}
                label='Movie url'
                value={movie?.poster_path}
                onChange={handleInput.bind(that, 'poster_path')}
            />
            <FormControl {...defaultProps}>
                <InputLabel shrink id='genres-select'>Genre</InputLabel>
                <Select
                    labelId='genres-select'
                    multiple
                    displayEmpty
                    value={movie?.genres}
                    onChange={handleInput.bind(that, 'genres')}
                >
                    <MenuItem disabled value=''>Select genre</MenuItem>
                    {GENRES.map((genre, i) =>
                        <MenuItem key={i} value={genre}>{genre}</MenuItem>
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
                type='number'
                value={movie?.runtime}
                onChange={handleInput.bind(that, 'runtime')}
            />
        </BasicMovieModal>
    </MuiPickersUtilsProvider>;
}

AddEditMovieModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    movie: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        releaseDate: PropTypes.string,
        url: PropTypes.string,
        genre: PropTypes.number,
        overview: PropTypes.string,
        runtime: PropTypes.number,
    }),
}
