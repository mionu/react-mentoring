import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { getMovieById } from '../../redux/actions/action-creators';
import Movie from '../../containers/Movie';

function Film({ id, title, ...props }) {
  useEffect(() => {
    props.getMovieById(id);
  }, [id]);

  return (
    <>
      <Head><title>{title}</title></Head>
      <Movie />
    </>
  );
}

Film.getInitialProps = (ctx) => ({ id: ctx.query.id });

Film.propTypes = {
  id: PropTypes.string.isRequired,
  getMovieById: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = ({ movies }) => ({ title: movies?.currentMovie?.title });

const mapDispatchToProps = (dispatch) => ({
  getMovieById: (id) => dispatch(getMovieById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Film);
