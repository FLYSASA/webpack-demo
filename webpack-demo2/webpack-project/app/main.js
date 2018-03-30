// const greeter = require('./greeter.js')
// document.querySelector('#root').appendChild(greeter())
// console.log(greeter())

import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

import './main.css'; 

render(<Greeter />, document.getElementById('root'));