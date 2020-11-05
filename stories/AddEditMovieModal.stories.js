import React from 'react';
import AddEditMovieModal from '../components/AddEditMovieModal';

export default {
  title: 'Example/AddEditMovieModal',
  component: AddEditMovieModal,
};

const Template = (args) => <AddEditMovieModal {...args} />;

export const AddModal = Template.bind({});
AddModal.args = {
  open: true,
  movie: {
    genres: [],
    release_date: null,
  },
};

export const EditModal = Template.bind({});
EditModal.args = {
  open: true,
  movie: {
    id: 123,
    title: 'Movie',
    genres: ['comedy'],
    poster_path: 'https://i.pinimg.com/originals/46/da/e5/46dae512e375bee2664a025507da8795.jpg',
    release_date: '2000-09-09',
    overview: 'Overview text',
    runtime: 90,
  },
};
