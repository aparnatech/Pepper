import React, { Component } from 'react';
import '../styles/display.css';
// import {BlogSite} from '../components/blogSite'
import BlogSite from '../components/blogSite';
// import { Redirect } from "react-router-dom";
// import ReactFileReader from 'react-file-reader';
import axios from 'axios'

export default class ADD extends Component {
    constructor(props) {
        super(props);   
        this.openBlog = this.openBlog.bind(this);
        this.iterateImage = this.iterateImage.bind(this);
        this.state = {
            datas: [],
            loading: false,
            component: false
        }
    }
 
    componentDidMount() {
        axios.get('http://localhost:5000/api/blog/')
        .then(res=> {
          const data = res.data
          this.setState({
            datas: data,
            loading: true,
          })
        }).catch(error => { console.log('request failed', error); });
    }
   
  iterateImage(link) {
    return (
      link.map((data,index)=> {
        return (
          <div className="col s12 m6 l3" key={index}>
		        <div id="pic1" className="card">
              <img alt="" src={data.image[0]} className="imgStyle"/>
			          <div className="overlay"></div>
			          <div className="card-content">
					        <span>{data.title}</span>
					        <p>{data.description}</p>
					          <p className="text_color" onClick={(e) => this.openBlog(e,data)}>
							        Learn more						      
					          </p> 
			          </div>
		        </div>
        	</div>
        )
      })
    )
  }
    openBlog(e,link) {
      e.preventDefault();
      console.log('sasq',e);
      this.setState({
        component: true,
        data: link
      })
    };
    // handleSuccessfullLogin(event) {
     
    //     console.log('inside edit');
    //     const token=localStorage.getItem('token')
    //     console.log('editToken',token);
    //     if(token && token.length > 10 ) {
    //        return true
        
    //   }
    // }
    render() {
      // const auth = this.handleSuccessfullLogin() 
      if(!this.state.component)
      if(this.state.datas.length) {
        <div className="row">
        </div>     
        return (
      
            <div className=""> 
            <nav>
              <div className="nav-wrapper">
      
              <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
             <li><a href="/add">Upload</a></li>
             </ul>
             </div>
            <div className="row">
              <div className="col s12">
                <ul className="right"></ul>
                  {this.iterateImage(this.state.datas)}
              </div>
            </div>
              </nav>       
            </div>
          );
      } else  if(this.state.datas.length === 0 && this.state.loading !== false) {
        return (
          <div className="box">
            Oops Gallery is empty...
       </div>
        );
      }else {
        return (
          <div className="box">
            <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>
          </div>
        );
      } else {
        if(this.state.component) {
          return <BlogSite {...this.state.data}/>
        }
      } 
    }
}

