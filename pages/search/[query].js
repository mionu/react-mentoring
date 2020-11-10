import Head from 'next/head';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setOptions } from '../../redux/actions/action-creators';
import Home from '../../containers/Home';

function Search(props) {
    useEffect(() => {
        props.searchMovies(props.search);
    }, [props.search]);

    return <>
        <Head><title>Search for {props.search}</title></Head>
        <Home />
    </>;
}

Search.getInitialProps = (ctx) => ({ search: ctx.query.query });

const mapDispatchToProps = (dispatch) => ({
    searchMovies: (search) => dispatch(setOptions({ search })),
});

export default connect(null, mapDispatchToProps)(Search);
