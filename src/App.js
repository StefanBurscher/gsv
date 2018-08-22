import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from './components/pages/HomePage/HomePage';
import Login from './components/pages/LoginPage/LoginPage';
import Register from './components/pages/RegisterPage/RegisterPage';
import MyWallet from './components/pages/MyWallet/MyWallet';
import Forum from './components/pages/ForumPage/ForumPage';

const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/Register" component={Register} />
      <Route path="/user/dashboard/mywallet" component={MyWallet} />
      <Route path="/user/dashboard/marketreturn" component={Register} />
      <Route path="/user/dashboard/marketrisk" component={Register} />
      <Route path="/forum" component={Forum} />
    </div>
  </Router>
);
export default BasicExample;