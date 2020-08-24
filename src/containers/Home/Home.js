import React from 'react';
import { Container } from '@material-ui/core';
import store from '../../shared/store';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header';
import Search from '../../components/Search';
import MoviesList from '../../components/MoviesList';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = { movies: [] };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ movies: store.getState().movies || [] });
        });

        store.dispatch({ type: 'GET_MOVIES_LIST' });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render () {
        return <ErrorBoundary>
            <Header />
            <Container>
                <Search />
                <MoviesList movies={this.state.movies} />
            </Container>
        </ErrorBoundary>;
    };
}