import React from 'react';
import './Search.scss';
import { TextField, Button } from '@material-ui/core';

export default function Search() {
    return <>
        <h1>FIND YOUR MOVIE</h1>
        <div className='search'>
            <TextField className='search-input' size='small' label='What do you want to watch?' variant='outlined' />
            <Button variant="contained">Search</Button>
        </div>
    </>;
}