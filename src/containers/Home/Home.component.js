import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { Container } from '@material-ui/core';
import ErrorBoundary from '../../components/ErrorBoundary';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Search from '../../components/Search';
import MoviesList from '../../components/MoviesList';

export default function Home(props) {
    const location = useLocation();
    const { query } = useParams();

    useEffect(() => {
        const searchTerm = location.pathname.includes('search') && query;
        props.search(searchTerm);
    }, [location, query]);

    return <ErrorBoundary>
        <Loading visible={props.loading} />
        <Header />
        <Container>
            <Search />
            <MoviesList movies={props.movies} />
        </Container>
    </ErrorBoundary>;
}
