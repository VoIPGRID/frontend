import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
import history from '../../utils/history';
import { get } from '../../lib/api/';

class VoIPGRID extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, data: undefined };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ loading: true });

    get('/session')
      .then(data => {
        this.setState({ data, loading: false });
      })
      .catch(res => {
        this.setState({ loading: false });
        history.push('/login');
      });
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return <div>Loading</div>;
    }

    return (
      <div className="voipgrid">
        <Switch>
          <Route path="/login">
            <ErrorBoundry>
              <Login handler={this.getData} />
            </ErrorBoundry>
          </Route>

          <Route path="*">
            <Fragment>
              <div className="column">
                <ErrorBoundry>
                  <Nav />
                </ErrorBoundry>
              </div>
              <div className="column">
                <ErrorBoundry>
                  <Header />
                </ErrorBoundry>
                <ErrorBoundry>
                  <Breadcrumbs />
                </ErrorBoundry>
                <main>
                  <ErrorBoundry>
                    <Switch>
                      <Redirect from="/" to="/dashboard" exact />
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
                      <Route path="/dashboard" component={Dashboard} />
                      <Route path="*" component={NotFound} />
                    </Switch>
                  </ErrorBoundry>
                </main>
              </div>
            </Fragment>
          </Route>
        </Switch>
      </div>
    );
  }
}

VoIPGRID.propTypes = {};

export default VoIPGRID;
