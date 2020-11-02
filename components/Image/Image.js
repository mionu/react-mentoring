import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const noImagePath = '/no-image.png';

const useStyles = makeStyles({
    notVisible: {
        opacity: 0,
        position: 'absolute',
    },
    visible: {
        opacity: 1,
        position: 'relative',
    },
});

export default function Image(props) {
    const [loaded, setLoaded] = useState(false);
    const classes = useStyles();

    return <>
        <img
            className={loaded ? classes.visible : classes.notVisible}
            width={props.width}
            height={props.height}
            alt={props.alt}
            src={props.src}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(false)}
        ></img>
        <img
            className={loaded ? classes.notVisible : classes.visible}
            width={props.width}
            height={props.height}
            alt={props.alt}
            src={noImagePath}
        ></img>
    </>;
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
