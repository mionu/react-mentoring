import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const filters = [
    'all',
    'documentary',
    'comedy',
    'horror',
    'crime',
];

const useStyles = makeStyles({
    root: {
        minWidth: 80,
    },
});

export default function MoviesFilter(props) {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();

    function filterChange(event, newValue) {
        setValue(newValue);
    }

    return <Tabs
        value={value}
        onChange={filterChange}
    >
        {filters.map((filter, i) => {
            return <Tab classes={{ root: classes.root }} key={i} label={filter}></Tab>
        })}
    </Tabs>;
}