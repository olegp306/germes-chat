import React, { Component } from 'react';
import data from './data.json';
import axios from 'axios'

import Chat from './components/Chat.jsx';


class App extends Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state={};

    //this.state = {};
  }
  componentDidMount() {
    let baseurl='http://localhost:85/germes/v1';
    let requestId=this.props.params.requestId;
    let userId=this.props.params.userId;
    var chatData={};
    var axiosChat = axios.create({baseURL: 'http://localhost:85/germes/v1'});
    this.setState({test1:'beforegetTokenByUserId' });

    var autorizeByUserId = function (userId){
      return axiosChat.post(baseurl+'/authbyappkey/token', {
        userid: userId,
        appkey: "kdwcc83defm8o7bkdwcc83defm8o7b"
        })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    }

    var getChatInfoByRequestId=function (requestId){
      return  axiosChat.get(baseurl+'/chats/request/'+requestId)
      // .then(function (response) {
      //   console.log(' getChatInfoByRequestId',response);
      // })
      // .catch(function (error) {
      //   console.log(' getChatInfoByRequestId',error);
      // });
    }

    var getUsersByChatId=function (chatId) {
      return axiosChat.get(baseurl+'/users/chatid/'+this.chatId)
      // .then(function (response) {
      //   console.log(' getCurrentChat',response);
      // })
      // .catch(function (error) {
      //   console.log(' getCurrentChat',error);
      // });
    }

    var getAllChatsByUserId= function (userId) {
      return axiosChat.get(baseurl+'/chats/user/'+this.userId)
      // .then(function (response) {
      //   console.log(' getCurrentChat',response);
      // })
      // .catch(function (error) {
      //   console.log(' getCurrentChat',error);
      // });
    }

    var getAllUsersByChatId= function (chatId) {
      return axiosChat.get(baseurl+'/users/chatid/'+chatId)
      // .then(function (response) {
      //   console.log(' getUsers',response);
      // })
      // .catch(function (error) {
      //   console.log(' getUsers',error);
      // });;
    }

    var getMessagesByChatId=function (chatId) {
      return axiosChat.get(baseurl+'/messages/chatid/'+ chatId)
      // .then(function (response) {
      //   console.log(' getMessages',response);
      // })
      // .catch(function (error) {
      //   console.log(' getMessages',error);
      // });
    }

    var toAssociativeArrfunction =function (data){
      let map = {};
      //console.log('toAssociativeArr', data);
      for (var i = 0, l = data.length; i < l; i++) {
          map[data[i].id] = data[i];
      }
      //console.log(map);
      return map;
    }

    var getInitialData=function (){

      autorizeByUserId(userId)
      .then((response)=>{
        axiosChat.defaults.headers.common['Authorization'] = 'Bearer '+response.data.accessToken;
        //2768005082000
        return getChatInfoByRequestId(requestId)
      })
      .then((response)=>{
        chatData.currentChatInfo=response.data;
        //console.log('chatData.currentChatId=response.data.Id:',response);
      })
      .then((response)=>{
        axios.all([getMessagesByChatId(chatData.currentChatInfo.id), getAllUsersByChatId(chatData.currentChatInfo.id)])
          .then(axios.spread(function (messages, users) {
            chatData.messages=toAssociativeArr(messages.data);
            chatData.users=toAssociativeArr(users.data);
            //chatData.chats=
            chatData.currentChatId=chatData.currentChatInfo.id;
            chatData.currentUserId=userId;
        }))
        .then((response)=>{
          this.setState({chat:chatData});
          console.log(chatData);

        })

        console.log(chatData);
      });
  }
    getInitialData();
  }

  render() {
  console.log('render');
  if(!this.state.alldata)
  {
    return <p>Loading</p>
  }
    //console.log(data);
    return (
      <div className="App">
        <Chat data={this.state.alldata}/>
      </div>
    );
  }
}

export default App;
