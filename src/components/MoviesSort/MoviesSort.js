import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const sortOptions = [{
    value: 'genre',
    text: 'genre',
}, {
    value: 'rating',
    text: 'rating',
}, {
    value: 'releaseDate',
    text: 'release date',
}];

const defaultSort = 'releaseDate';

const useStyles = makeStyles({
    select: {
        minWidth: 180,
    },
});

export default function MoviesSort() {
    const [sort, setSort] = React.useState(defaultSort);
    const classes = useStyles();

    function handleChange(event) {
        setSort(event.target.value);
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
        {sortOptions.map((sort, i) => {
            return <MenuItem key={i} value={sort.value}>{sort.text.toUpperCase()}</MenuItem>
        })}
    </TextField>;
}
