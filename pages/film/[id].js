import Head from 'next/head';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovieById } from '../../redux/actions/action-creators';
import Movie from '../../containers/Movie';

function Film(props) {
    useEffect(() => {
        props.getMovieById(props.id);
    }, [props.id]);

    return <>
        <Head><title>{props.title}</title></Head>
        <Movie />
    </>;
}

Film.getInitialProps = (ctx) => ({ id: ctx.query.id });

const mapStateToProps = ({ movies }) => ({ title: movies?.currentMovie?.title });

const mapDispatchToProps = (dispatch) => ({
    getMovieById: (id) => dispatch(getMovieById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Film);
