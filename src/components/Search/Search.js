import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    search: {
        display: 'flex',
        justifyContent: 'center',
    },
    searchInput: {
        flexGrow: 2,
        marginRight: 10,
    },
});

export default function Search() {
    const classes = useStyles();

    return <>
        <h1>FIND YOUR MOVIE</h1>
        <div className={classes.search}>
            <TextField className={classes.searchInput} size='small' label='What do you want to watch?' variant='outlined' />
            <Button variant='contained'>Search</Button>
        </div>
    </>;
}
