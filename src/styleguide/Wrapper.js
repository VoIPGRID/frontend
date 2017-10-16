// lib/styleguide/Wrapper.js
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Assets for our generic app styling.
import '../assets/style/base.css';
import '../assets/vendor/fontawesome/css/font-awesome-core.css';
import '../assets/vendor/fontawesome/css/font-awesome-solid.css';

export default class Wrapper extends Component {
  render() {
    return <BrowserRouter>{this.props.children}</BrowserRouter>;
  }
}
