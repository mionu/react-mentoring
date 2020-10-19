import { sharedReducer as reducer, initialState } from './shared-reducer';
import ActionTypes from '../actions/action-types';

describe('sharedReducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    describe('SET_LOADING', () => {
        it('should set loading state', () => {
            const oldState = {
                loading: { global: true },
            };
            const payload = { type: 'global', state: false };
            const action = {
                type: ActionTypes.SET_LOADING,
                payload,
            };
            const expectedState = {
                loading: { global: false },
            };

            expect(reducer(oldState, action)).toEqual(expectedState);
        });
    });
});
