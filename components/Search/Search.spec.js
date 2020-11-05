import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import renderer from 'react-test-renderer';
import { TextField } from '@material-ui/core';
import Search from './Search';

/* eslint-disable no-undef, react/jsx-filename-extension */
describe('Search', () => {
  beforeAll(() => jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect));
  afterAll(() => React.useEffect.mockRestore());

  it('should render', () => {
    const searchTerm = 'search';

    const component = renderer.create(
      <RouterContext.Provider value={{ query: { query: searchTerm } }}>
        <Search />
      </RouterContext.Provider>,
    );

    expect(component.toJSON).toMatchSnapshot();

    const search = component.root.findByType(TextField);
    expect(search).toBeDefined();
    expect(search.props.value).toBe(searchTerm);
  });
});
/* eslint-enable no-undef, react/jsx-filename-extension */
