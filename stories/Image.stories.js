import React from 'react';
import Image from '../components/Image';

export default {
  title: 'Example/Image',
  component: Image,
};

const Template = (args) => <Image {...args} />;

export const Loaded = Template.bind({});
Loaded.args = {
  src: 'https://i.pinimg.com/originals/46/da/e5/46dae512e375bee2664a025507da8795.jpg',
  height: 400,
  width: 300,
};

export const NotLoaded = Template.bind({});
NotLoaded.args = {
  src: 'asd',
  height: 400,
  width: 300,
};
