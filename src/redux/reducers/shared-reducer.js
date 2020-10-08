import ActionTypes from '../actions/action-types';
import { LOADING } from '../../shared/constants';

const initialState = {
    loading: {
        [LOADING.GLOBAL]: false,
        [LOADING.MOVIES_LIST]: false,
    },
};

export function sharedReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.payload.type]: action.payload.state,
                }
            };
        default:
            return state;
    }
}
