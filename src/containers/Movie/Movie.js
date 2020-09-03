import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import store from '../../shared/store';
import ErrorBoundary from '../../components/ErrorBoundary';
import MoviesList from '../../components/MoviesList';
import MovieDetails from '../../components/MovieDetails';
import { useComponentDidMount } from '../../shared/effects';

const useStyles = makeStyles({
    searchIcon: {
        left: '95%',
        position: 'relative',
    },
});

function getMovieById(id) {
    const { movies } = store.getState();

    return movies.find(movie => movie.id === id);
}

export default function Movie() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const classes = useStyles();

    useComponentDidMount(() => {
        const unsubscribe = store.subscribe(() => {
            setMovies(store.getState().movies || []);
        });
        
        store.dispatch({ type: 'GET_MOVIES_LIST' });

        return unsubscribe;
    });

    return <ErrorBoundary>
        <IconButton className={classes.searchIcon}><Link to='/'><SearchIcon fontSize='large'/></Link></IconButton>
        <Container>
            <MovieDetails movie={getMovieById(id)} />
            <MoviesList movies={movies} />
        </Container>
    </ErrorBoundary>;
}
