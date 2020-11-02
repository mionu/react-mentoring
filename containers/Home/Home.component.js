import React from 'react';
import { Container } from '@material-ui/core';
import ErrorBoundary from '../../components/ErrorBoundary';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Search from '../../components/Search';
import MoviesList from '../../components/MoviesList';

export default function Home(props) {
    return <ErrorBoundary>
        <Loading visible={props.loading} />
        <Header />
        <Container>
            <Search />
            <MoviesList movies={props.movies} />
        </Container>
    </ErrorBoundary>;
}
