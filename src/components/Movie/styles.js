import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    moreIcon: {
        border: '1px solid #333',
        borderRadius: '50%',
        marginRight: 5,
        marginTop: 5,
        right: 0,
        padding: 7,
        position: 'absolute',
        top: 0,
    },
    movie: {
        width: 300,
    },
    moviePoster: {
        position: 'relative',
        width: 300,
    },
    movieTitleRow: {
        alignItems: 'baseline',
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 7,
        paddingTop: 5,
    },
    posterOverlay: {
        height: '100%',
        opacity: 0,
        position: 'absolute',
        width: '100%',
        zIndex: 1,

        '&:hover': {
            opacity: 1,
            transition: 'opacity 0.3s',
        },
    },
    releaseDate: {
        border: '1px solid #555',
        borderRadius: 5,
        padding: '3px 10px',
    }
});
