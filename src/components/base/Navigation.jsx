import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import styled from 'styled-components';

import { logoutUser } from '../../actions/BaseActions';

import NavigationItem from './NavigationItem';

const StyledNavigation = styled.div`
  background: ${props => props.theme.primary};
  position: fixed;
  z-index: 1052;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  width: 80px;
  transition: 0.3s;
  padding-top: 20px;

  &:hover {
    width: 250px;
  }

  > ul {
    width: 250px;
    margin: 0;
    padding: 0;
  }
`;

const NavigationListBottom = styled.ul`
  width: 250px;
  position: absolute;
  bottom: 0;
`;

/**
 * Navigation component that renders our main navigation.
 */
class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      context: {
        type: null,
        id: null
      }
    };
  }

  // This lifecycle method will set the state with params from the url
  // to change the url when switching context between partner and client.
  componentWillReceiveProps(nextProps) {
    // if (this.props.partner.branding !== nextProps.partner.branding) {
    //   this.setState({
    //     theme: {
    //       primary: nextProps.partner.branding.primary,
    //       secondary: nextProps.partner.branding.secondary
    //     }
    //   });
    // }

    if (nextProps.match.params.id) {
      this.setState({
        context: {
          type: nextProps.match.params.type,
          id: nextProps.match.params.id
        }
      });
    } else {
      this.setState({
        context: {
          type: nextProps.match.params.type,
          id: null
        }
      });
    }
  }

  // This function calls an API endpoint to logout the user, reset our
  // app state to the initial values and redirects to the login page.
  logoutUser() {
    this.props.logoutUser();
    this.props.history.push('/user/logout');
  }

  render() {
    const { translate } = this.props;
    let urlPrepend = '/';

    if (this.state.context.id && this.state.context.type) {
      urlPrepend = `/${this.state.context.type}/${this.state.context.id}/`;
    }

    return (
      this.props.auth.user.authenticated && (
        <StyledNavigation>
          <ul>
            <NavigationItem link="/partners" icon="fa-users" title="Partners" />
            <NavigationItem
              link={`${urlPrepend}clients`}
              icon="fa-users"
              title={translate('Clients')}
            />
          </ul>

          <NavigationListBottom>
            <NavigationItem
              link="/user/personal_settings"
              icon="fa-question-circle"
              title="Wiki"
            />

            <NavigationItem icon="fa-arrow-square-right">
              <a onClick={() => this.logoutUser()} role="button" tabIndex={0}>
                Logout
              </a>
            </NavigationItem>
          </NavigationListBottom>
        </StyledNavigation>
      )
    );
  }
}

const mapStateToProps = state => ({
  auth: state.base.auth,
  partner: state.partners
});

Navigation = connect(mapStateToProps, { logoutUser })(Navigation);

// Use the withTranslate Higher Order Component (HoC) to transpose the
// translate function in our component.
Navigation = withTranslate(Navigation);

export default Navigation;
