import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundry from '../ErrorBoundry/';
import Header from '../Header/';
import Breadcrumbs from '../Breadcrumbs/';
import Nav from '../Nav/';
import pages from '../pages/';
import api from '../../lib/api';
import history from '../../utils/history';

class VoIPGRID extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    this.check();
  }

  check = () => {
    this.setState({ loading: true });

    api('/session').then(res => {
      this.setState({ loading: false });
      if (res.error) {
        history.push('/login');
      }
    });
  };

  render() {
    const { loading } = this.state;
    const { Login } = pages;

    if (loading) {
      return <div>Loading</div>;
    }

    return (
      <Switch>
        <Route path="/login">
          <ErrorBoundry>
            <Login handler={this.check} />
          </ErrorBoundry>
        </Route>

        <Route path="*">
          <ErrorBoundry>
            <div className="voipgrid">
              <div className="column">
                <Nav />
              </div>
              <div className="column">
                <Header />
                <Breadcrumbs />
                <main>
                  <ErrorBoundry>
                    <Switch>
                      <Route path="/administration" exact component={pages.Administration} />
                      <Route path="/calls" component={pages.Calls} />
                      <Route path="/dialplans" component={pages.DialPlans} />
                      <Route path="/modules" component={pages.Modules} />
                      <Route path="/partners" component={pages.Partners} />
                      <Route path="/statistics" component={pages.Statistics} />
                      <Route path="/users" component={pages.Users} />
                      <Route path="/" exact component={pages.Dashboard} />
                      <Route path="*" component={pages.NotFound} />
                    </Switch>
                  </ErrorBoundry>
                </main>
              </div>
            </div>
          </ErrorBoundry>
        </Route>
      </Switch>
    );
  }
}

VoIPGRID.propTypes = {};

export default VoIPGRID;
