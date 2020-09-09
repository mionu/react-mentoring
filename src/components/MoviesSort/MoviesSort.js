import React from 'react';
import { connect } from 'react-redux';
import { MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setOptions } from '../../redux/actions/action-creators';
import { SORT_OPTIONS, MOVIE_FIELDS } from '../../shared/constants';

const defaultSort = MOVIE_FIELDS.RELEASEDATE;

const useStyles = makeStyles({
    select: {
        minWidth: 180,
    },
});

const MoviesSort = (props) => {
    const [sort, setSort] = React.useState(props.sortBy || defaultSort);
    const classes = useStyles();

    function handleChange(event) {
        setSort(event.target.value);
        props.sort(event.target.value);
    }

    return <TextField
        label='SORT BY'
        variant='outlined'
        margin='dense'
        select
        className={classes.select}
        value={sort}
        onChange={handleChange}
    >
        {SORT_OPTIONS.map((sort, i) => {
            return <MenuItem key={i} value={sort.value}>{sort.text.toUpperCase()}</MenuItem>
        })}
    </TextField>;
}

const mapStateToProps = ({ moviesReducer }) => ({ sortBy: moviesReducer.options.sortBy });

const mapDispatchToProps = (dispatch) => ({
    sort: (sortBy) => dispatch(setOptions({ sortBy })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesSort);
