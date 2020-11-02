import { connect } from 'react-redux';
import { LOADING } from '../../shared/constants';
import MovieComponent from './Movie.component';

const mapStateToProps = ({ movies, shared }) => ({
    loading: shared.loading[LOADING.GLOBAL],
    moviesList: movies.list,
    movie: movies.currentMovie,
    options: movies.options,
});

export default connect(mapStateToProps)(MovieComponent);
