import React from 'react';
import * as api from  '../api/api.js';
import axios from 'axios';

import BigChatDescription from './BigChatDescription.jsx';
import SmallChatDescription from './SmallChatDescription.jsx';
import Message from './Message.jsx';
import MessagesList from './MessagesList.jsx';
import NewMessageBox from './NewMessageBox.jsx';
import ContactsList from './ContactsList.jsx';

require('./Chat.css');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    axios.all([api.getMessagesByChatId(this.props.chatId), api.getAllUsersByChatId(this.props.chatId),api.getAllChatsByUserId(this.props.userId)])
        .then(axios.spread((respMessages, respUsers, respChats) => {
            this.setState({
                messages: api.toAssociativeArray(respMessages.data),
                users: api.toAssociativeArray(respUsers.data),
                chats: api.toAssociativeArray(respChats.data),
                currentChatId:this.props.chatId,
                currentUserId:this.props.userId,
                newMessageText:''
            });
        }));
}

  addMessagge=(messageText)=>{
    let message={
      chatId: this.state.currentChatId,
      userId: this.state.currentUserId,
      name: messageText
    };

    api.addMessage(message)
    .then((response)=>{
      console.log(response);
      //добавить новое сообщение
      api.getMessagesByChatId(this.props.chatId)
      .then((responce)=>{
        this.setState({newMessageText:'', messages: api.toAssociativeArray(responce.data)})
      })
      //this.setState({newMessageText:''});
    },
    (error)=>{
      console.log(error);
    })
    console.log('messaggeAdded');
    //меняем state
  }

  addChat=(chatInfo)=>{
    //меняем state
    console.log('addChat');
  }

  addUSer=(chatId)=>{
    //меняем state
    console.log('addUSer');
  }

  render () {
    if( !this.state.users || !this.state.messages || !this.state.chats  )
    {
      return <p>MessagesList Loading....</p>
    }
    return (
      <div className="bootstrap">
        <div className="panel panel-primary">
          <BigChatDescription chatInfo={this.state.chats[this.state.currentChatId]}/>
          <MessagesList currentChatId={this.state.currentChatId} currentUserId={this.props.userId} messages={this.state.messages} users={this.state.users}/>
          <NewMessageBox addMessageFn={this.addMessagge} newMessageText={this.state.newMessageText}/>

        </div>
      </div>
    )
  };

}

export default Chat;
