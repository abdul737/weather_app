/*
 * Copyright (c) 2019, Abdulbosid Khamidov.
 * MIT License (Fully Open Source)
 */

import React from 'react';
import {Link} from 'react-router-dom'

function Header(){
    // main header of the app
    return (
        // Header contains two links, one for daily forecast main page and other one is about page
        <header style={headerStyle}>
            <h1>5 day Weather App</h1>
            <Link style={linkStyle} to="/">Daily</Link> | <Link
            style={linkStyle} to="/about">About</Link>
        </header>
    )
}
// header block style
const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
};
// style for links in the header
const linkStyle = {
   color: '#fff',
   textDecoration: 'none'
};

export default Header