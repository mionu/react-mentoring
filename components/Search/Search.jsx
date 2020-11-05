import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
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

const Search = () => {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router.query;
  const defaultQuery = query || '';
  const [term, setSearchTerm] = useState(defaultQuery);

  const handleInput = useCallback(({ target }) => {
    setSearchTerm(target.value);
  }, []);

  const runSearch = () => {
    router.push(!term ? '/' : `/search/${term}`);
  };

  const handleKeyPress = useCallback(({ key }) => {
    if (key === 'Enter') {
      runSearch();
    }
  }, []);

  return (
    <>
      <h1>FIND YOUR MOVIE</h1>
      <div className={classes.search}>
        <TextField
          className={classes.searchInput}
          size="small"
          variant="outlined"
          label="What do you want to watch?"
          value={term}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
        />
        <Button variant="contained" onClick={runSearch}>Search</Button>
      </div>
    </>
  );
};

export default Search;
