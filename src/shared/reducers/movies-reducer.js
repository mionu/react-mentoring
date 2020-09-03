import movies from '../static-movies';

const initialState = [];

export default function moviesReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_MOVIES_LIST':
            return movies;
        default:
            return state;
    }
}
