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
      <Route exact path="/login" component={Login} />
      <Route exact path="/Register" component={Register} />
      <Route exact path="/user/dashboard/mywallet" component={MyWallet} />
      <Route exact path="/user/dashboard/marketreturn" component={Register} />
      <Route exact path="/user/dashboard/marketrisk" component={Register} />
      <Route exact path="/forum/:kategorija" component={Forum} />
      <Route exact path="/forum/:kategorija/:index" component={Forum} />
    </div>
  </Router>
);
export default BasicExample;