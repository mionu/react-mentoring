import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { addMovie } from '../../redux/actions/action-creators';
import { useToggle } from '../../shared/hooks';
import AddEditMovieModal from '../AddEditMovieModal';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 40,
    marginTop: 20,
  },
});

const Header = (props) => {
  const [open, toggleOpen] = useToggle();
  const classes = useStyles();

  const onSubmit = useCallback((movie) => {
    props.addMovie(movie);
  }, []);

  return (
    <>
      <div className={classes.header}>
        <Button variant="contained" onClick={toggleOpen}>
          <AddIcon />
          Add movie
        </Button>
      </div>
      <AddEditMovieModal open={open} onClose={toggleOpen} onSubmit={onSubmit} />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addMovie: (movie) => dispatch(addMovie(movie)),
});

Header.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
