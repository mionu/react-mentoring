import { connect } from 'react-redux';
import { setOptions } from '../../redux/actions/action-creators';
import { LOADING } from '../../shared/constants';
import HomeComponent from './Home.component';

const mapStateToProps = ({ movies, shared }) => ({
    movies: movies.list,
    options: movies.options,
    loading: shared.loading[LOADING.GLOBAL],
});

const mapDispatchToProps = (dispatch) => ({
    search: (search) => dispatch(setOptions({ search })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
