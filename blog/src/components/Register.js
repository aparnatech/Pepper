import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../styles/register.css'
class Register extends Component {
    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          password: "",
          password2: "",
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit = e => {
        e.preventDefault();
        if(this.state.password !== this.state.password2) {
          alert ("password mismatch");
        } else {
          const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
          };
            if (newUser.name && newUser.email && newUser.password && newUser.password2) {
              console.log(newUser);
              axios.post('http://localhost:5000/api/blogUser/register', newUser )
              .then(res => {
               console.log("res",res);
              });
            } 
        //  if (newUser.name || newUser.email || newUser.password || newUser.password2) {
        //   console.log(newUser);
        //   axios.post('http://localhost:5000/api/blogUser/register', newUser )
        //   .then(res => {
        //      console.log("res",res);
        //   });
        // } 
       
    }
  }
render() {
    
return (
      <div className="container">
        <div className="row row-style">
          <div className="col s8 offset-s2">
            <Link to="/display" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                onChange={this.onChange}
                value={this.state.name}
                  id="name"
                  type="text"
                required/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                  required />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                    onChange={this.onChange}
                    value={this.state.password}
                    id="password"
                    type="password"
                    required  />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  id="password2"
                  type="password"
                  required />
                <label htmlFor="password2">Confirm Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;