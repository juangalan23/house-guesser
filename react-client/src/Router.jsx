import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom'
import Root from './Theme.jsx';



render((
    <BrowserRouter >
        <Root />
    </BrowserRouter>
), document.getElementById('app'));