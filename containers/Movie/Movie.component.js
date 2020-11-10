import React, { useEffect } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { Container, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ErrorBoundary from '../../components/ErrorBoundary';
import Loading from '../../components/Loading';
import MoviesList from '../../components/MoviesList';
import MovieDetails from '../../components/MovieDetails';

const useStyles = makeStyles({
    searchIcon: {
        left: '95%',
        position: 'relative',
    },
});

export default function MovieComponent(props) {
    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props.movie?.id]);

    return <ErrorBoundary>
        <Loading visible={props.loading} />
        <IconButton className={classes.searchIcon}><Link href='/'><SearchIcon fontSize='large'/></Link></IconButton>
        <Container>
            <MovieDetails {...props.movie} />
            <MoviesList movies={props.moviesList} />
        </Container>
    </ErrorBoundary>;
}
