import React, { Component } from 'react';
import '../styles/blogSite.css';
import axios from 'axios';
import Edit from '../components/edit';
import { Redirect} from "react-router-dom";
// import {BleditogSite} from '../components/blogSite'

export default class blogSite extends Component {
  
  constructor(props) {
    super(props);   
    this.openEdit = this.openEdit.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.iteratedata = this.iteratedata.bind(this);
    const date = new Date(this.props.date);
    const date1 = date.getFullYear()+'/' + (date.getMonth()+1) + '/'+date.getDate();
    var p = date1.split(/\D/g)
    const newdate = [p[2],p[1],p[0]].join("/")
    this.state = {
      datas : [this.props],
      date: newdate,
      editBoolean: false,
  
    }
  }
  openEdit(event,link) {
    console.log(link);
    var arr = [];
    arr.push(link)
    console.log(arr);
    event.preventDefault();
    this.setState({
      editBoolean: true,
    })
    this.state.othercomponent = arr;
    this.state.date = this.state.date;
    console.log('openedit', this.state.othercomponent);
  //  if(this.state.editBoolean) {
  //     console.log('edit');
  //     return  <Edit {...link}/>
  //   }
  }
  openDelete(id) {
    event.preventDefault();
    axios.delete(`http://localhost:5000/api/blog/delete/${id}`)
    .then(res=> {
        this.setState({
          datas: this.state.datas.filter(el=>el._id !== id)
        })
        alert('deleted');
        <Redirect to= '/'/>
    }).catch(error => { console.log('request failed', error); });
  }
  iteratedata(d) {
    return (
      d.map((link,index)=> {
        return (
          <div className="postagem" key={index}>
                <h2>{link.title}</h2>
                <span className="data-postagem">{this.state.date}</span>
                <span className="data-postagem" onClick={(e) => this.openEdit(e,link)}>Edit</span>
                <span className="data-postagem" onClick={(e) => this.openDelete(link._id)}>Delete</span>
                <img  alt="" src={link.image}/>
                <p>{link.description} </p>
          </div>
        )
      })
  
    )
  }
    render() {
    
  //  const editable = this.state.editBoolean
  if( this.state.editBoolean) {
   return  <Edit {...this.state.othercomponent} />
  }
      return (
        <div>
    
          <nav className="material-navbar white">
            <div className="row nav-bar-top">
            <div className="container main-content">
            <div className="col s11 nav-left">
                <a href="/" data-activates="mobile-demo"
                   className="waves-effect show-on-large button-collapse toggle-menu left color">
                   Back
                </a>
            </div>
            </div>
            </div>
          </nav>
            <div id="area-principal">
              <div id="area-postagens">
              {this.iteratedata(this.state.datas)}
              </div>
            </div>
        </div>
      );
      }
}