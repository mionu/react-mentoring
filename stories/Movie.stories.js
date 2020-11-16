import React from 'react';
import Movie from '../components/Movie';

export default {
  title: 'Example/Movie',
  component: Movie,
};

const Template = (args) => <Movie {...args} />;

export const ExampleMovie = Template.bind({});
ExampleMovie.args = {
  onClick: () => {},
  movie: {
    genres: ['comedy'],
    poster_path: 'https://i.pinimg.com/originals/46/da/e5/46dae512e375bee2664a025507da8795.jpg',
    release_date: '2010-04-04',
    title: 'Movie',
  },
};
