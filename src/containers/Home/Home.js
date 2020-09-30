import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import { setOptions } from '../../redux/actions/action-creators';
import { LOADING } from '../../shared/constants';
import ErrorBoundary from '../../components/ErrorBoundary';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Search from '../../components/Search';
import MoviesList from '../../components/MoviesList';

const Home = (props) => {
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

const mapStateToProps = ({ movies, shared }) => ({
    movies: movies.list,
    options: movies.options,
    loading: shared.loading[LOADING.GLOBAL],
});

const mapDispatchToProps = (dispatch) => ({
    search: (search) => dispatch(setOptions({ search })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
