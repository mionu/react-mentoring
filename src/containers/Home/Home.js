import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import store from '../../shared/store';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header';
import Search from '../../components/Search';
import MoviesList from '../../components/MoviesList';
import { useComponentDidMount } from '../../shared/effects';

export default function Home() {
    const [movies, setMovies] = useState([]);

    useComponentDidMount(() => {
        const unsubscribe = store.subscribe(() => {
            setMovies(store.getState().movies || []);
        });
        
        store.dispatch({ type: 'GET_MOVIES_LIST' });

        return unsubscribe;
    });

    return <ErrorBoundary>
        <Header />
        <Container>
            <Search />
            <MoviesList movies={movies} />
        </Container>
    </ErrorBoundary>;
}
