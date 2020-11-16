import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
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
  const filterIndex = GENRE_FILTER_VALUES.findIndex((genre) => genre === props.filter);
  const [value, setValue] = React.useState(Math.max(filterIndex, 0));
  const classes = useStyles();

  const filterChange = useCallback((event, newValue) => {
    setValue(newValue);

    if (newValue === 0) {
      props.dispatchFilter([]);
    } else {
      props.dispatchFilter([GENRE_FILTER_VALUES[newValue]]);
    }
  }, []);

  return (
    <Tabs
      value={value}
      onChange={filterChange}
    >
      {GENRE_FILTER_VALUES.map((filter) => (
        <Tab classes={{ root: classes.root }} key={filter} label={filter} />))}
    </Tabs>
  );
};

const mapStateToProps = ({ movies }) => ({ filter: movies.options.filter?.[0] });

const mapDispatchToProps = (dispatch) => ({
  dispatchFilter: (filter) => dispatch(setOptions({ filter })),
});

MoviesFilter.propTypes = {
  dispatchFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

MoviesFilter.defaultProps = {
  filter: GENRE_FILTER_VALUES[0],
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesFilter);
