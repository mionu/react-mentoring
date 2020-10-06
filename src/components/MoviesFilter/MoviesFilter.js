import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setOptions } from '../../redux/actions/action-creators';
import { GENRE_FILTER_VALUES } from '../../shared/constants';

const useStyles = makeStyles({
    root: {
        minWidth: 80,
    },
});

const MoviesFilter = (props) => {
    const filterIndex = GENRE_FILTER_VALUES.findIndex(genre => genre === props.filter);
    const [value, setValue] = React.useState(Math.max(filterIndex, 0));
    const classes = useStyles();

    function filterChange(event, newValue) {
        setValue(newValue);
        
        if (newValue === 0) {
            props.dispatchFilter([]);
        } else {
            props.dispatchFilter([GENRE_FILTER_VALUES[newValue]]);
        }
    }

    return <Tabs
        value={value}
        onChange={filterChange}
    >
        {GENRE_FILTER_VALUES.map((filter, i) => {
            return <Tab classes={{ root: classes.root }} key={i} label={filter}></Tab>
        })}
    </Tabs>;
}

const mapStateToProps = ({ movies }) => ({ filter: movies.options.filter?.[0] });

const mapDispatchToProps = (dispatch) => ({
    dispatchFilter: (filter) => dispatch(setOptions({ filter })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesFilter);
