import React, { Component } from 'react';

import NewMessageBox from './NewMessageBox.jsx';
import Message from './Message.jsx';
import * as api from  '../api/api.js';

class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

 //при инициализации 1 раз
  componentDidMount() {
    this.setState({users:this.props.users,messages:this.props.messages, currentUserId:this.props.currentUserId}) ;
    //this.scrollTolastMessage();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    //this.state={text:nextProps.newMessageText};
    this.setState({users:nextProps.users,messages:nextProps.messages, currentUserId:nextProps.currentUserId}) ;
  }
  //каждый раз после изменения props после render
  componentDidUpdate(prevProps, prevState) {
    this.scrollTolastMessage();
  }

  scrollTolastMessage=()=>{
      var objDiv = document.getElementsByClassName('panel-body');
      document.getElementsByClassName('panel-body')[0].scrollTop = document.getElementsByClassName('panel-body')[0].scrollHeight;
    }


    render() {
      if( !this.state.users || !this.state.messages )
      {
        return <p>MessagesList Loading....</p>
      }
      else {
        if(Object.keys(this.state.messages).length==0)
        {
           return <p>Нет ни одного сообщения. Напишите первым !</p>
        }
        //console.log(this.props.data);
        let currentUserId=this.state.currentUserId;
        let users=this.state.users;
        let messages=this.state.messages;
        let messagesListView= new Array;

        for (let prop in messages)
        {
          let message=messages[prop];

          let isMyMessage=false;
          if(message.userId==currentUserId){
            isMyMessage=true;
          }
          messagesListView.push (<Message key = {message.id} message={message} user={users[message.userId]} isMyMessage={isMyMessage}/>);
        }

        return (
          <div>
            <div className="panel-body">
              <ul className="chat">
                {messagesListView}
              </ul>
            </div>

          </div>

        );
      }
  }
}

export default MessagesList;
