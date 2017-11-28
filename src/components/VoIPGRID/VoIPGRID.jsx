import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundry from '../ErrorBoundry/';
import Header from '../Header/';
import Breadcrumbs from '../Breadcrumbs/';
import Nav from '../Nav/';
import Administration from '../pages/Administration';
import Calls from '../pages/Calls';
import Dashboard from '../pages/Dashboard';
import DialPlans from '../pages/DialPlans';
import Login from '../pages/Login';
import Modules from '../pages/Modules';
import NotFound from '../pages/NotFound';
import Partners from '../pages/Partners';
import Statistics from '../pages/Statistics';
import Users from '../pages/Users';
import { get } from '../../lib/api';
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

    get('/session').then(res => {
      this.setState({ loading: false });
      if (res.error) {
        history.push('/login');
      }
    });
  };

  render() {
    const { loading } = this.state;

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
                      <Route
                        path="/administration"
                        exact
                        component={Administration}
                      />
                      <Route path="/calls" component={Calls} />
                      <Route path="/dialplans" component={DialPlans} />
                      <Route path="/modules" component={Modules} />
                      <Route path="/partners" component={Partners} />
                      <Route path="/statistics" component={Statistics} />
                      <Route path="/users" component={Users} />
                      <Route path="/" exact component={Dashboard} />
                      <Route path="*" component={NotFound} />
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
