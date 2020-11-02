import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    header: {
        alignItems: 'baseline',
        display: 'flex',
        justifyContent: 'space-between',
        textTransform: 'uppercase',
    }
});

export default function BasicMovieModal(props) {
    const classes = useStyles();

    return <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle disableTypography className={classes.header}>
            <Typography variant='h6'>{props.headerText}</Typography>
            <IconButton aria-label='close' onClick={props.onClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
            {props.onReset
                ? <Button onClick={props.onReset}>Reset</Button>
                : <Button onClick={props.onClose}>Cancel</Button>}
            <Button disabled={!props.valid} onClick={props.onSubmit} color='primary'>Submit</Button>
        </DialogActions>
    </Dialog>;
}

BasicMovieModal.propTypes = {
    open: PropTypes.bool.isRequired,
    valid: PropTypes.bool,
    headerText: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func,
}

BasicMovieModal.defaultProps = {
    valid: true,
};
