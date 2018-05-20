// import 'babel-polyfill';
import "isomorphic-fetch"
import React from 'react'
import ReactDOM from 'react-dom'
import Reference from './components/Reference/Reference.jsx'

ReactDOM.render(
    <Reference/>,
    document.getElementById('app')
);
