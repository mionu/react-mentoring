import React from 'react';
import './Header.scss';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function Header(props) {
    return <div className='header'>
        <Button className='add-btn' variant="contained"><AddIcon />Add movie</Button>
    </div>;
}