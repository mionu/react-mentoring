import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getMovieById, setOptions } from '../../redux/actions/action-creators';
import { useComponentDidMount } from '../../shared/hooks';
import ErrorBoundary from '../../components/ErrorBoundary';
import MoviesList from '../../components/MoviesList';
import MovieDetails from '../../components/MovieDetails';

const useStyles = makeStyles({
    searchIcon: {
        left: '95%',
        position: 'relative',
    },
});

const Movie = (props) => {
    const { id } = useParams();
    const classes = useStyles();

    useComponentDidMount(() => {
        props.getMoviesList();
    });

    useEffect(() => {
        props.getMovieById(id);
        window.scrollTo(0, 0);
    }, [id]);

    return <ErrorBoundary>
        <IconButton className={classes.searchIcon}><Link to='/'><SearchIcon fontSize='large'/></Link></IconButton>
        <Container>
            <MovieDetails movie={props.movie} />
            <MoviesList movies={props.moviesList} />
        </Container>
    </ErrorBoundary>;
}

const mapStateToProps = ({ moviesReducer }) => ({
    moviesList: moviesReducer.movies,
    movie: moviesReducer.currentMovie,
    options: moviesReducer.options,
});

const mapDispatchToProps = (dispatch) => ({
    getMoviesList: () => dispatch(setOptions({})),
    getMovieById: (id) => dispatch(getMovieById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
