import React, { Component } from 'react';
import data from './data.json';
import axios from 'axios'

import Chat from './components/Chat.jsx';


class App extends Component {

  componentWillMount() {
    let baseurl='http://localhost:85/germes/v1';
    //http://localhost:85/germes/v1/users/chatid/2768027587000
    var chatdata={};
    let requestId=this.props.params.requestId;

    let userId=this.props.params.userId;

//получим токен
axios.post(baseurl+'/authbyappkey/token', {
  userid: userId,
  appkey: "kdwcc83defm8o7bkdwcc83defm8o7b"
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


//найдем чат по id заявки
    axios.get(baseurl+'/chats/request/'+requestId)
    .then(function (response) {
      console.log('axios',response);
    })
    .catch(function (error) {
      console.log('axios',error);
    });

//соберем все данные по заявке

      function getCurrentChat() {
        return axios.get(baseurl+'/users/chatid/2768027587000');
      }

      function getUsers() {
        return axios.get(baseurl+'/users/chatid/2768027587000');
      }

      function getMessages() {
        return axios.get(baseurl+'/germes/v1/messages/'+ chatdata.currentChatId);
      }


      axios.all([getUsers(), getMessages()])
      .then(axios.spread(function (users, messages) {
        chatdata.users=users;
        chatdata.messages=messages;
          console.log(chatdata);
      }));

  //console.log(chatdata);
}



  render() {
    //console.log('console from APP');
    //console.log(data);
    return (
      <div className="App">
        <Chat data={data}/>
      </div>
    );
  }
}

export default App;
