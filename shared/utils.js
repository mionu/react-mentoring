import _ from 'lodash';

export const extractReleaseYear = (releaseDate) => {
  if (releaseDate) {
    return releaseDate.slice(0, 4);
  }
  return '';
};

export const getParamsFromObject = (params) => {
  const keys = Object.keys(params);
  const stringParams = keys.reduce((acc, cur) => {
    const rawValue = params[cur];
    const value = _.isArray(rawValue) ? rawValue?.join(',') : rawValue?.toString();

    if (!_.isNil(value) && value.length) {
      // eslint-disable-next-line no-param-reassign
      acc += `${cur}=${value}&`;
    }

    return acc;
  }, '');

  return stringParams.slice(0, -1);
};

export const isScrolledToTheBottom = () => document.documentElement.offsetHeight
  - (window.innerHeight + document.documentElement.scrollTop) < 100;
