import { connect } from 'react-redux';
import { getMovieById } from '../../redux/actions/action-creators';
import MovieComponent from './Movie.component';

const mapStateToProps = ({ movies }) => ({
    moviesList: movies.list,
    movie: movies.currentMovie,
    options: movies.options,
});

const mapDispatchToProps = (dispatch) => ({
    getMovieById: (id) => dispatch(getMovieById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieComponent);
