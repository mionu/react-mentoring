import { connect } from 'react-redux';
import { LOADING } from '../../shared/constants';
import HomeComponent from './Home.component';

const mapStateToProps = ({ movies, shared }) => ({
    movies: movies.list,
    options: movies.options,
    loading: shared.loading[LOADING.GLOBAL],
});

export default connect(mapStateToProps)(HomeComponent);
