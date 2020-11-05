import * as Yup from 'yup';
import _ from 'lodash';
import { MOVIE_FIELDS } from '../../shared/constants';
import { controls, FORM_FIELDS } from './constants';

// eslint-disable-next-line no-confusing-arrow
const getDefaultValue = (control) => {
  if (control === MOVIE_FIELDS.GENRES) {
    return [];
  }
  if (control === MOVIE_FIELDS.RELEASEDATE) {
    return null;
  }

  return '';
};

const generateFormControlProps = (formik) => FORM_FIELDS.reduce((config, control) => {
  const controlProps = config[control];

  // eslint-disable-next-line no-param-reassign
  config[control].props = _.assign({}, controlProps, {
    id: control,
    name: control,
    value: formik.values[control] || getDefaultValue(control),
    error: formik.errors[control] && formik.touched[control],
    helperText: formik.touched[control] && formik.errors[control],
    onChange: control === MOVIE_FIELDS.RELEASEDATE ? (event) => {
      formik.setFieldValue(control, event.format('YYYY-MM-DD'));
    } : formik.handleChange,
    onBlur: formik.handleBlur,
  });

  return config;
}, controls);

const validationSchema = Yup.object({
  [MOVIE_FIELDS.TITLE]: Yup.string().required(),
  [MOVIE_FIELDS.RELEASEDATE]: Yup.date().required(),
  [MOVIE_FIELDS.POSTER]: Yup.string().url().required(),
  [MOVIE_FIELDS.GENRES]: Yup.array().required(),
  [MOVIE_FIELDS.OVERVIEW]: Yup.string().required(),
  [MOVIE_FIELDS.RUNTIME]: Yup.number().positive().required(),
});

export {
  generateFormControlProps,
  validationSchema,
};
