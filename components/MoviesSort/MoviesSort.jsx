import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
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

const MoviesSort = ({ sortBy, ...props }) => {
  const [sort, setSort] = React.useState(sortBy || defaultSort);
  const classes = useStyles();

  const handleChange = useCallback((event) => {
    setSort(event.target.value);
    props.sort(event.target.value);
  }, []);

  return (
    <TextField
      label="SORT BY"
      variant="outlined"
      margin="dense"
      select
      className={classes.select}
      value={sort}
      onChange={handleChange}
    >
      {SORT_OPTIONS.map((sortOption) => (
        <MenuItem key={sortOption.value} value={sortOption.value}>
          {sortOption.text.toUpperCase()}
        </MenuItem>
      ))}
    </TextField>
  );
};

const mapStateToProps = ({ movies }) => ({ sortBy: movies.options.sortBy });

const mapDispatchToProps = (dispatch) => ({
  sort: (sortBy) => dispatch(setOptions({ sortBy })),
});

MoviesSort.propTypes = {
  sort: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesSort);
