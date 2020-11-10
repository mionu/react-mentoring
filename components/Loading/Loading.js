import React from 'react';
import { Backdrop, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    backdrop: {
        zIndex: 1,
    },
});

export default function Loading({ visible }) {
    const classes = useStyles();

    return <Backdrop open={visible} className={classes.backdrop}>
        <CircularProgress size='5rem' />
    </Backdrop>;
}
