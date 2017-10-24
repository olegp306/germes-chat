import React, { Component } from 'react';
import Message from './Message.jsx';

class MessagesList extends Component {
    render() {
    //console.log(this.props.data);
    let currentUserId=this.props.currentUserId;
    let users=this.props.users;
    let messagesList= new Array;

    for (let prop in this.props.messages)
    {
      let message=this.props.messages[prop];

      let isMyMessage=false;
      if(message.userId==currentUserId){
        isMyMessage=true;
      }

      messagesList.push (<Message key = {message.id} message={message} user={users[message.userId]} isMyMessage={isMyMessage}/>);
    }
    return (
      <div className="panel-body">
        <ul className="chat">
          {messagesList}
        </ul>
      </div>
    );
  }
}

export default MessagesList;
