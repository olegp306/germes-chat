import React, { Component } from 'react';

import NewMessageBox from './NewMessageBox.jsx';
import Message from './Message.jsx';
import * as api from  '../api/api.js';

class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state={
      users:this.props.users,
      messages:this.props.messages,
      currentUserId:this.props.currentUserId,
      unreadMessages:this.props.unreadMessages,
      messagesWasReadFn:this.props.messagesWasReadFn};
  }

 //при инициализации 1 раз
  componentDidMount() {
      this.scrollTolastMessage();
  }

  componentWillReceiveProps(nextProps) {
    if(!this.readNewMessagesTimerId){
      clearTimeout (this.timerId);
    }

    this.setState({
      users:nextProps.users,
      messages:nextProps.messages,
      currentUserId:nextProps.currentUserId,
      unreadMessages:nextProps.unreadMessages,
      messagesWasReadFn:nextProps.messagesWasReadFn
    });
  }
  //каждый раз после изменения props после render
  componentDidUpdate(prevProps, prevState) {
    this.scrollTolastMessage();
  }

  scrollTolastMessage=()=>{
      var objDiv = document.getElementById('messagesList');
      if(objDiv)
      {
        objDiv.scrollTop =objDiv.scrollHeight;
      }
    }


    render() {
      if( !this.state.users || !this.state.messages )
      {
        return <p>MessagesList Loading....</p>
      }
      else {
        if(Object.keys(this.state.messages).length==0)
        {
           return (
             <div id="messagesList" className="panel-body">
               <ul className="chat">
                 <p>Нет ни одного сообщения. Напишите первым !</p>
               </ul>
             </div>);
        }
        //console.log(this.props.data);
        let currentUserId=this.state.currentUserId;
        let users=this.state.users;
        let messages=this.state.messages;
        let messagesListView= new Array;

        for (let prop in messages)
        {
          let message=messages[prop];

          let isNewMessage=(this.state.unreadMessages[message.id] ? true : false);
          let isMyMessage=(message.userId==this.state.currentUserId ? true: false);

          messagesListView.push (
            <Message
              key = {message.id}
              messageInfo={message}
              userInfo={users[message.userId]}
              isMyMessage={isMyMessage}
              isNewMessage={isNewMessage}
              />);
        }

        this.readNewMessagesTimerId = setTimeout(()=>{this.state.messagesWasReadFn(this.state.unreadMessages)}, 4000);

        return (
            <div id="messagesList" className="panel-body">
              <ul className="chat">
                {messagesListView}
              </ul>
            </div>
        );
      }
    }

}

export default MessagesList;
