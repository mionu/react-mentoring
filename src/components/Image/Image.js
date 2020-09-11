import React from 'react';
import PropTypes from 'prop-types';
import NoImage from '../../../assets/no-image.png';

export default function Image(props) {
    const setFallbackImage = ({ target }) => {
        target.src = NoImage;
    }

    return <img
        width={props.width}
        height={props.height}
        alt={props.alt}
        src={props.src}
        onError={setFallbackImage}
    ></img>
}

Image.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    src: PropTypes.string,
    alt: PropTypes.string,
};

Image.defaultProps = {
    width: 300,
    height: 400,
};
