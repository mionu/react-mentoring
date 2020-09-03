import React from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import AddEditModal from '../AddEditModal';
import store from '../../shared/store';
import { useToggle } from '../../shared/effects';

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: 40,
        marginTop: 20,
    }
});

export default function Header() {
    const [open, toggleOpen] = useToggle();
    const classes = useStyles();

    const onSubmit = (movie) => {
        store.dispatch({ type: 'ADD_MOVIE', data: movie });
    }

    return <>
        <div className={classes.header}>
            <Button variant='contained' onClick={toggleOpen}><AddIcon />Add movie</Button>
        </div>
        <AddEditModal open={open} onClose={toggleOpen} onSubmit={onSubmit} />
    </>;
}
