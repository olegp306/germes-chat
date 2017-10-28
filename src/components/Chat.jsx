import React, { Component } from '../../react/react.js';

import BigChatDescription from './BigChatDescription.jsx';
import SmallChatDescription from './SmallChatDescription.jsx';
import Message from './Message.jsx';
import MessagesList from './MessagesList.jsx';
import NewMessageBox from './NewMessageBox.jsx';
import ContactsList from './ContactsList.jsx';

require('./Chat.css');

class Chat extends React.Component {
  render () {
    //console.log(this.props.data);
    let data=this.props.data;
    return (
      <div className="bootstrap">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="panel panel-primary">
                <BigChatDescription data={data.chats[data.currentChatId] }/>
                <MessagesList messages={data.messages} users = {data.users} currentUserId={data.currentUserId}/>
                <NewMessageBox />
              </div>
            </div>
          </div>
        </div>
      </div>
  )

  };
  _updateLocalStorage() {
      let chatDM = JSON.stringify(this.state.chatDM);
      localStorage.setItem('chatDM', chatDM);
  }
}

export default Chat;
