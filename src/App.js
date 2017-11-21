import React, { Component } from 'react';
import data from './data.json';
import axios from 'axios';
// Import global api settings
import './global-api';

import * as api from  './api/api.js';

import Chat from './components/Chat.jsx';

//import {testExternalParam} from  './index.js';

//Надо получиь параметры из Клариса распарсить здесь и отдать всем

class App extends Component {
  constructor(props) {
    console.log('constructor');
    super(props);

    this.state={};

    //this.state = {};
  }
  componentDidMount() {
    console.log('App componentDidMount',this.props);
    let userId=this.props.userId;
    const activeUser = JSON.parse(localStorage.getItem('claris-vnext-global-user'));

    if (activeUser!=null) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${activeUser.accessToken}`;
      }
    else {
      api.authenticateByUserId(this.props.chatparams.userId)
      .then(
        (response)=>{
        //console.log(data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        this.setState({isAutorized:true});

        //todo записать в локал сторед
      },
      (error)=>{
        console.log(error)
      });
    }
  }

  render() {
  console.log('render');
  if(this.state.isAutorized==false || !this.state.isAutorized )
  {
    return <p>Autorization....</p>
  }
  if(this.state.isAutorized==true) {
      return (
      <div className="App">
        <Chat chatId={this.props.chatparams.chatId} userId={this.props.chatparams.userId}/>
      </div>
    );
  }
    //console.log(data);

  }
}

export default App;
