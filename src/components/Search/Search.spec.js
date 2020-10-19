import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { TextField } from '@material-ui/core';
import Search from './Search';

describe('Search', () => {
    beforeAll(() => jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect));
    afterAll(() => React.useEffect.mockRestore());

    const mockStore = configureStore([]);
    let store;

    beforeEach(() => {
        store = mockStore({
            movies: {
                options: {},
            },
        });
    });

    it('should render', () => {
        const searchTerm = 'search';

        store = mockStore({
            movies: {
                options: { search: searchTerm },
            },
        });

        const component = renderer.create(
            <MemoryRouter initialEntries={['search/a']}>
                <Route path='search/:searchTerm'>
                    <Provider store={store}>
                        <Search />
                    </Provider>
                </Route>
            </MemoryRouter>
        );

        expect(component.toJSON).toMatchSnapshot();

        const search = component.root.findByType(TextField);
        expect(search).toBeDefined();
        expect(search.props.value).toBe(searchTerm);
    });
});
