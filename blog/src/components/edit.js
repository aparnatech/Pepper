import React, { Component } from 'react';
import '../styles/edit.css';
import ReactFileReader from 'react-file-reader';
import axios from 'axios'


export default class Edit extends Component {
  
  
  constructor(props) {
    super(props);   
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangetitle = this.onChangetitle.bind(this);
    this.onChangedescription = this.onChangedescription.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    console.log('pppp',this.props);
    this.state = {
      id: this.props[0]._id,
      image: this.props[0].image,
      title: this.props[0].title,
      description: this.props[0].description,
    };
    console.log(this.state.image);
    console.log(this.state.id);
    console.log(this.state.title);
    console.log(this.state.description);
  }
  
  // componentWillMount() {
  //   axios.get('http://localhost:5000/api/blog/')
  //   .then(res=> {
  //     const data = res.data
  //     console.log('data', data);
  //     this.setState({
  //       id:data[0]._id,
  //       image:data[0].image[0] ,
  //       title: data[0].title,
  //       description: data[0].description
       
  //     })
  //   }).catch(error => { console.log('request failed', error); });
    
  // }
  onChangetitle = event => {
    console.log('event', event.target.value);
    this.setState({
      title: event.target.value
    })
  }
  onChangedescription=event => {
    console.log('event', event.target.value);
    this.setState({
      description: event.target.value
    })
  }
  onSubmit = event => {
    
    event.preventDefault(); 
    const detail = {
      image: this.state.image,
      description: this.state.description,
      title: this.state.title,
      id: this.state.id
  }
    console.log('detail',detail);
    axios.post(`http://localhost:5000/api/blog/updating/${detail.id}`, detail)
    .then(res=> {
      const data = res.data
      console.log('data1212', data);
      this.setState({
        id:'',
        image:'' ,
        title:'',
        description: ''
      })
    }).catch(error => { console.log('request failed', error); });
    
  }
 
  fileSelectedHandler(event) {
    this.setState({
      image: event.target.value
    })
  }
    render() {
     
      return (
       <div className="center">
          <a href="/" data-activates="mobile-demo" className="waves-effect show-on-large button-collapse toggle-menu left color">Back</a> 
           <form onSubmit={this.onSubmit} method="post" className="form_class">
        <ReactFileReader handleFiles={this.fileSelectedHandler} base64={true} multipleFiles={true}>
        <button type="button" className='btn'>choose Image</button>
        </ReactFileReader>
        <input type="text" placeholder="title here..." value={this.state.title} onChange={this.onChangetitle} className="uploading_input"/> 
        <br/>
         <textarea placeholder="description..." rows="20" value={this.state.description} onChange={this.onChangedescription} id="comment_text" cols="40" className="ui-autocomplete-input" role="textbox" aria-autocomplete="list" aria-haspopup="true"></textarea>
        <div><button className="waves-effect waves-light btn-small" type="submit"><i className="material-icons left">cloud</i>update</button>  </div>  
        </form> 
      
        </div>
      );
      }
}