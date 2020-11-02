import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import MovieComponent from './Movie.component';

describe('MovieComponent', () => {
    beforeAll(() => jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect));
    afterAll(() => React.useEffect.mockRestore());
    
    const mockProps = {
        getMovieById: jest.fn(),
    };
    const mockStore = configureStore([]);
    window.scrollTo = jest.fn();

    let store;

    beforeEach(() => {
        store = mockStore({
            movies: {
                list: [],
                options: {},
            },
            shared: {
                loading: {},
            },
        });
    });

    it('should render', () => {        
        const tree = renderer
            .create(
                <MemoryRouter initialEntries={['film/123']}>
                    <Route path='film/:filmId'>
                        <Provider store={store}>
                            <MovieComponent {...mockProps} />
                        </Provider>
                    </Route>
                </MemoryRouter>
            ).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});
