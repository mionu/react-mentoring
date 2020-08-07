import React from 'react';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const sortOptions = [{
    value: 'title',
    text: 'title',
}, {
    value: 'releaseDate',
    text: 'release date',
}];

const useStyles = makeStyles({
    select: {
        minWidth: 120,
        textTransform: 'uppercase',
        height: 30,
    },
    menuItem: {
        textTransform: 'uppercase',
    },
});

export default function MoviesSort(props) {
    const [sort, setSort] = React.useState('releaseDate');
    const classes = useStyles();

    function handleChange(event) {
        setSort(event.target.value);
    }

    return <div class='sort-by'>
        <InputLabel id='sort-by-label'>Sort by</InputLabel>
        <Select
            labelId='sort-by-label'
            className={classes.select}
            variant='outlined'
            value={sort}
            onChange={handleChange}
        >
            {sortOptions.map((sort, i) => {
                return <MenuItem key={i} className={classes.menuItem} value={sort.value}>{sort.text}</MenuItem>
            })}
        </Select>
    </div>;
}