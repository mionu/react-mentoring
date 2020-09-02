import React from 'react';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { setOptions } from '../../redux/actions/action-creators';
import { useComponentDidMount } from '../../shared/hooks';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header';
import Search from '../../components/Search';
import MoviesList from '../../components/MoviesList';

const Home = (props) => {
    useComponentDidMount(() => {
        props.getMoviesList();
    });

    return <ErrorBoundary>
        <Header />
        <Container>
            <Search />
            <MoviesList movies={props.movies} />
        </Container>
    </ErrorBoundary>;
}

const mapStateToProps = ({ moviesReducer }) => ({ movies: moviesReducer.movies, options: moviesReducer.options });
const mapDispatchTpProps = (dispatch) => ({
    getMoviesList: () => dispatch(setOptions({})),
});

export default connect(mapStateToProps, mapDispatchTpProps)(Home);
