import React from 'react';
import { Button, Container, Typography, makeStyles } from '@material-ui/core';
import ErrorBoundary from '../../components/ErrorBoundary';
import Image from '../../components/Image';
import Picture404 from '../../../assets/404.png';

const useStyles = makeStyles({
    button: {
        marginTop: 50,
    },
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 100,
    },
});

export default function NotFound() {
    const classes = useStyles();

    return <ErrorBoundary>
        <Container className={classes.container}>
            <Typography variant='h2'>Page not found</Typography>
            <Image src={Picture404} width={600} height={300}></Image>
            <Button
                className={classes.button}
                size='large'
                variant='outlined'
                href='/'
            >Go back to home</Button>
        </Container>
    </ErrorBoundary>;
}
