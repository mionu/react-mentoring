import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getMovieById } from '../../redux/actions/action-creators';
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

    useEffect(() => {
        props.getMovieById(id);
        window.scrollTo(0, 0);
    }, [id]);

    return <ErrorBoundary>
        <IconButton className={classes.searchIcon}><Link to='/'><SearchIcon fontSize='large'/></Link></IconButton>
        <Container>
            <MovieDetails {...props.movie} />
            <MoviesList movies={props.moviesList} />
        </Container>
    </ErrorBoundary>;
}

const mapStateToProps = ({ movies }) => ({
    moviesList: movies.list,
    movie: movies.currentMovie,
    options: movies.options,
});

const mapDispatchToProps = (dispatch) => ({
    getMovieById: (id) => dispatch(getMovieById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
