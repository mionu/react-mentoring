import * as utils from './utils';

/* eslint-disable no-undef, react/jsx-filename-extension, react/jsx-props-no-spreading */
describe('utils', () => {
  describe('extractReleaseYear', () => {
    it('should return first four chars from date string', () => {
      expect(utils.extractReleaseYear('1900-01-01')).toBe('1900');
    });

    it('should return empty string if no params provided', () => {
      expect(utils.extractReleaseYear()).toBe('');
    });
  });

  describe('getParamsFromObject', () => {
    it('should make query params out of object', () => {
      const obj = { search: 'term', count: 8 };

      expect(utils.getParamsFromObject(obj)).toBe('search=term&count=8');
    });

    it('should handle arrays', () => {
      const obj = { array: ['one', 'two'] };

      expect(utils.getParamsFromObject(obj)).toBe('array=one,two');
    });

    it('should filter empty values', () => {
      const obj = {
        search: 'term', count: 8, empty: '', zero: 0,
      };

      expect(utils.getParamsFromObject(obj)).toBe('search=term&count=8&zero=0');
    });
  });
});
/* eslint-enable no-undef, react/jsx-filename-extension, react/jsx-props-no-spreading */
