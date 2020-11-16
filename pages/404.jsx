import React from 'react';
import {
  Button, Container, Typography, makeStyles,
} from '@material-ui/core';
import ErrorBoundary from '../components/ErrorBoundary';

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

  return (
    <ErrorBoundary>
      <Container className={classes.container}>
        <Typography variant="h2">Page not found</Typography>
        <img src="/404.png" alt="" width={600} height={300} />
        <Button
          className={classes.button}
          size="large"
          variant="outlined"
          href="/"
        >
          Go back to home
        </Button>
      </Container>
    </ErrorBoundary>
  );
}
