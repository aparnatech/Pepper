import React, { Component } from 'react';
import Add from './components/Add'
import display from './components/display'
import { BrowserRouter as Router, Route } from "react-router-dom";
import blogSite from './components/blogSite';
import edit from './components/edit'
import Register from './components/Register'
import Login from './components/login'
// import './App.css';
class App extends Component {
  render() {
    return (
      <Router>
      <div className="">
        <Route exact path="/add" component={Add} />
        <Route exact path="/" component={display} />
        <Route exact path="/blogsite" component={blogSite} />
        <Route exact path="/edit" component={edit} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
    );
  }
}

export default App;
