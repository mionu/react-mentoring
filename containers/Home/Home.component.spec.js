import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import HomeComponent from './Home.component';

/* eslint-disable no-undef, react/jsx-filename-extension, react/jsx-props-no-spreading */
describe('HomeComponent', () => {
  beforeAll(() => jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect));
  afterAll(() => React.useEffect.mockRestore());

  const mockProps = {
    search: jest.fn(),
    loading: false,
    movies: [],
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
        <RouterContext.Provider value={{ query: { query: 'a' } }}>
          <Provider store={store}>
            <HomeComponent {...mockProps} />
          </Provider>
        </RouterContext.Provider>,
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
/* eslint-enable no-undef, react/jsx-filename-extension, react/jsx-props-no-spreading */
