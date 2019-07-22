import React, { Component } from "react";
import { Link ,Redirect} from "react-router-dom";
import axios from 'axios';
import '../styles/login.css';
class Login extends Component {
 

    constructor() {
        super();
       
        this.state = {
          email: "",
          password: "",
          authenticate: false
        //   errors: {}
        };
      }
onChange = e => {
  this.setState({ [e.target.id]: e.target.value });
};
onSubmit = e => {
  e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:5000/api/blogUser/login', userData)
      .then(res => {
        console.log("resiooio",res.data.token);
          localStorage.setItem('token',res.data.token);
          this.setState({authenticate: true})
          // this.isauthenticated()
          this.setState();
      }).catch (err => {
    })
  };

isauthenticated () {
  console.log('frfr');
  const token=localStorage.getItem('token')
  console.log('inside',token);
 if(token && token.length > 10) {
 }   
}

render() {
  const auth = this.state.authenticate
  console.log('frauthr',auth);
return (
  <div>
  { auth ? <Redirect to='/'/> : (
    <div  className="row margin_top">
<div className="col s8 offset-s2 style" >
  <Link to="/" className="btn-flat waves-effect">
    <i className="material-icons left">keyboard_backspace</i> Back to
    home
  </Link>
  <div className="col s12 padding_left">
    <h4>
      <b>Login</b> below
    </h4>
    <p className="grey-text text-darken-1">
      Don't have an account? <Link to="/register">Register</Link>
    </p>
  </div>
  <form noValidate onSubmit={this.onSubmit}>
    <div className="input-field col s12">
      <input
         onChange={this.onChange}
         value={this.state.email}
        id="email"
        type="email"
        required  />
      <label htmlFor="email">Email</label>
    </div>
    <div className="input-field col s12">
      <input
       onChange={this.onChange}
       value={this.state.password}
        id="password"
        type="password"
     required />
      <label htmlFor="password">Password</label>
    </div>
    <div className="col s12 padding_left">
      <button
        type="submit"
        className="btn btn-large waves-effect waves-light hoverable blue accent-3 button_style">
        Login
      </button>
    </div>
  </form>
</div>
</div>
)}
</div>
 
   
  );
  }
}
export default Login;
// <div className="container">

