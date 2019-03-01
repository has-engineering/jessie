import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import LeaveApplication from './pages/LeaveApplication';

import './index.css';
import LeaveApplicationList from './pages/LeaveApplicationList';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/leaveListing" component={LeaveApplicationList} />
      <Route path="/leaveForm" component={LeaveApplication} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
