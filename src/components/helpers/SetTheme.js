import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

const SetTheme = props => (
  <ThemeProvider theme={props.branding}>{props.children}</ThemeProvider>
);

const mapStateToProps = ({ branding }) => ({
  branding
});

export default connect(mapStateToProps)(SetTheme);
