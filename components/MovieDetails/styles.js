import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  displayFlex: {
    display: 'flex',
  },
  ml20: {
    marginLeft: 20,
  },
  movieInfo: {
    flexDirection: 'column',
    flexGrow: 2,
  },
  infoRow: {
    paddingBottom: 10,
  },
  rating: {
    border: '1px solid',
    borderRadius: '50%',
    padding: 10,
    textAlign: 'center',
  },
  ratingColor5: {
    color: '#57e32c',
    borderColor: '#57e32c',
  },
  ratingColor4: {
    color: '#b7dd29',
    borderColor: '#b7dd29',
  },
  ratingColor3: {
    color: '#ffe234',
    borderColor: '#ffe234',
  },
  ratingColor2: {
    color: '#ffa534',
    borderColor: '#ffa534',
  },
  ratingColor1: {
    color: '#ff4545',
    borderColor: '#ff4545',
  },
});
