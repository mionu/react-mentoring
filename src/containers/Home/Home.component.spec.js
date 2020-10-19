import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import HomeComponent from './Home.component';

describe('HomeComponent', () => {
    beforeAll(() => jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect));
    afterAll(() => React.useEffect.mockRestore());

    const mockProps = {
        search: jest.fn(),
        loading: false,
    };
    const mockStore = configureStore([]);

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
                <MemoryRouter initialEntries={['search/a']}>
                    <Route path='search/:term'>
                        <Provider store={store}>
                            <HomeComponent {...mockProps} />
                        </Provider>
                    </Route>
                </MemoryRouter>
            ).toJSON();
        
        expect(tree).toMatchSnapshot();
        expect(mockProps.search).toHaveBeenCalled();
    });
});
