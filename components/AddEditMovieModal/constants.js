import { MOVIE_FIELDS } from '../../shared/constants';

const controls = {
  [MOVIE_FIELDS.ID]: {
    InputProps: {
      readOnly: true,
    },
    label: 'ID',
  },
  [MOVIE_FIELDS.TITLE]: {
    autoFocus: true,
    label: 'Title',
  },
  [MOVIE_FIELDS.RELEASEDATE]: {
    inputVariant: 'outlined',
    format: 'YYYY-MM-DD',
    label: 'Release date',
    variant: 'inline',
  },
  [MOVIE_FIELDS.POSTER]: {
    label: 'Movie url',
  },
  [MOVIE_FIELDS.GENRES]: {
    displayEmpty: true,
    label: 'Genres',
    labelId: 'genres-select',
    multiple: true,
    // eslint-disable-next-line no-confusing-arrow
    renderValue: (selected) => selected.length ? selected.join(', ') : 'Select genre',
  },
  [MOVIE_FIELDS.OVERVIEW]: {
    label: 'Overview',
  },
  [MOVIE_FIELDS.RUNTIME]: {
    label: 'Runtime',
    type: 'number',
  },
};

const defaultProps = {
  variant: 'outlined',
  margin: 'dense',
  type: 'text',
  fullWidth: true,
};

const defaultState = {
  [MOVIE_FIELDS.TITLE]: '',
  [MOVIE_FIELDS.RELEASEDATE]: null,
  [MOVIE_FIELDS.POSTER]: '',
  [MOVIE_FIELDS.GENRES]: [],
  [MOVIE_FIELDS.OVERVIEW]: '',
  [MOVIE_FIELDS.RUNTIME]: '',
};

const FORM_FIELDS = [
  MOVIE_FIELDS.TITLE,
  MOVIE_FIELDS.RELEASEDATE,
  MOVIE_FIELDS.POSTER,
  MOVIE_FIELDS.GENRES,
  MOVIE_FIELDS.OVERVIEW,
  MOVIE_FIELDS.RUNTIME,
];

export {
  controls,
  defaultProps,
  defaultState,
  FORM_FIELDS,
};
