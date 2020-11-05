import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

export default function Image({
  alt, height, src, width,
}) {
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();

  return (
    <>
      <img
        className={loaded ? classes.visible : classes.notVisible}
        width={width}
        height={height}
        alt={alt}
        src={src}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
      <img
        className={`${classes.noImage} ${loaded ? classes.notVisible : classes.visible}`}
        width={width}
        height={height}
        alt={alt}
      />
    </>
  );
}

Image.propTypes = {
  alt: PropTypes.string,
  height: PropTypes.number,
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
};

Image.defaultProps = {
  alt: '',
  height: 400,
  width: 300,
};
