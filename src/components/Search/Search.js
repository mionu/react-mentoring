import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

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
    const defaultSearchTerm = props.searchTerm || '';
    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

    const handleInput = ({ target }) => {
        setSearchTerm(target.value);
    };

    const handleKeyPress = ({ key }) => {
        if (key === 'Enter') {
            runSearch();
        }
    }
    
    const runSearch = () => {
        props.history.push(!searchTerm ? '/' : `/search/${searchTerm}`);
    };

    useEffect(() => {
        setSearchTerm(defaultSearchTerm);
    }, [props.searchTerm]);

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

const mapStateToProps = ({ movies }) => ({ searchTerm: movies.options.search });

export default withRouter(connect(mapStateToProps)(Search));
