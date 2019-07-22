import React, { Component } from 'react';
import '../styles/Add.css';
import ReactFileReader from 'react-file-reader';
import axios from 'axios'
import {Redirect} from "react-router-dom";

class ADD extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            image: '',
            description: '',
            title: ''
        }
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.onChangedescription =  this.onChangedescription.bind(this);
        this.onSubmit =  this.onSubmit.bind(this);
        this.onChangetitle = this.onChangetitle.bind(this);
    }
    onSubmit = event => {
        alert('clicked');
        event.preventDefault();
        if(this.state.image === ''){
           alert('Upload the image');
        }
        
        else {
            const detail = {
                image: this.state.image,
                description: this.state.description,
                title: this.state.title
            }
            axios.post('http://localhost:5000/api/blog/blogs', detail )
                .then(res => {
                   console.log("res",res);
                    alert('image uploaded');

                    this.setState ({
                    image: '',
                    description: '',
                    title: ''
                });
            })
        }
    }
    onChangedescription = event => {
        event.preventDefault();
        this.setState({
            description: event.target.value
        })
    }
    onChangetitle = event => {
        event.preventDefault();
        this.setState({
            title: event.target.value
        })
    }
    fileSelectedHandler (files) {
        this.setState({
            image: files.base64
        })
    } 
   
    render() {
     
        return (
          <div className="center">
                 <a href="/" data-activates="mobile-demo"
                   className="waves-effect show-on-large button-collapse toggle-menu left color">
                   Back
                </a> 
            <form onSubmit={this.onSubmit} method="post" className="form_class">
            <ReactFileReader handleFiles={this.fileSelectedHandler} base64={true} multipleFiles={true}>
            <button type="button" className='btn'>choose Image</button>
            </ReactFileReader>
            <input type="text" placeholder="title here..."  value={this.state.title}  onChange={this.onChangetitle} className="uploading_input" required/> 
            <br/>
             <textarea placeholder="description..."  rows="20" value={this.state.description}  onChange={this.onChangedescription}  id="comment_text" cols="40" className="ui-autocomplete-input" role="textbox" aria-autocomplete="list" aria-haspopup="true" required></textarea>
            <div><button className="waves-effect waves-light btn-small" type="submit"><i className="material-icons left">cloud</i>upload</button></div>        
            </form>   
            </div>  
        );
    }
  
}

export default ADD;
