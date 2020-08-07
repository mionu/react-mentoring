import React from 'react';
import './MoviesList.scss';
import PropTypes from 'prop-types';
import MoviesFilter from '../MoviesFilter';
import MoviesSort from '../MoviesSort';
import Movie from '../Movie/Movie';

export default function MoviesList(props) {
    const movies = !props.movies?.length ?
        <div className='empty-movies-list'>
            <h1>No movies found</h1>
        </div> :
        <>
        <div className='movies-counter'><strong>{props.movies.length}</strong> movies found</div>
        <div class='movies'>{
            props.movies.map(movie => {
                return <Movie key={movie.id} movie={movie} />
            })
        }</div>
        </>;

    return <>
        <div className='movies-list-header'>
            <MoviesFilter />
            <MoviesSort />
        </div>
        {movies}
    </>;
}

MoviesList.propTypes = {
    movies: PropTypes.array.isRequired,
};