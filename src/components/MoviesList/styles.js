import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    emptyMoviesList: {
        marginLeft: 'auto',
        marginTop: 50,
        width: '60%',
    },
    flexSpaceBetween: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    loading: {
        left: '50%',
        margin: '30px 0',
        position: 'relative',
    },
    moviesCounter: {
        margin: 15,
    },
    moviesList: {
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        margin: '15px 0',
    },
});
