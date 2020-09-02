import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setOptions } from '../../redux/actions/action-creators';

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

const Search = (props) => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState(props.searchTerm || '');

    const handleInput = ({ target }) => {
        setSearchTerm(target.value);
    };

    const handleKeyPress = ({ key }) => {
        if (key === 'Enter') {
            runSearch();
        }
    }
    
    const runSearch = () => {
        props.search(searchTerm);
    };

    return <>
        <h1>FIND YOUR MOVIE</h1>
        <div className={classes.search}>
            <TextField
                className={classes.searchInput}
                size='small'
                variant='outlined'
                label='What do you want to watch?'
                value={searchTerm}
                onChange={handleInput}
                onKeyPress={handleKeyPress}
            />
            <Button variant='contained' onClick={runSearch}>Search</Button>
        </div>
    </>;
}

const mapStateToProps = ({ moviesReducer }) => ({ searchTerm: moviesReducer.options.search });

const mapDispatchToProps = (dispatch) => ({
    search: (search) => dispatch(setOptions({ search })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
