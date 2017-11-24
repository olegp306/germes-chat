import React, { Component } from 'react';
import * as api from  '../api/api.js';
import Chat from './Chat.jsx';

class ChatsList extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  //при инициализации 1 раз
  componentDidMount() {
     this.setState({chats:this.props.chats, currentChatId:this.props.currentChatId});
   }

  componentWillReceiveProps(nextProps) {
    this.setState({chats:nextProps.chats, currentChatId:nextProps.currentChatId});
  }

  render() {
    if(!this.state.chats)
    {
      return <p>ChatsList Loading....</p>
    }
    else {
      //console.log(this.state.chats);
      if(Object.keys(this.state.chats).length==0)
      {
         return <p>Нет ни одного сообщения. Напишите первым !</p>
      }
      //console.log(this.props.data);
      //let currentUserId=this.state.currentUserId;
      //let users=this.state.users;
      let chats=this.state.chats;
      let chatsListView= new Array;

      for (let prop in chats)
      {
        let chat=chats[prop];
        let isCurrentChat=false;
        if(chat.id==this.state.currentChatId){
          isCurrentChat=true;
        }

        chatsListView.push (<Chat key={chat.id} chatInfo={chat} isCurrentChat={isCurrentChat} changeCurrentChatFn={this.props.changeCurrentChatFn} />);
      }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Чаты</h3>
        </div>
        <div className="panel-body">
          <div className="input-group">
             <input type="text" className="form-control" placeholder="Поиск чата" aria-label="Amount (to the nearest dollar)"/>
             <span className="input-group-addon">Лупа</span>
          </div>
          <div className="sidebar">
            <ul className="nav nav-sidebar">
              {chatsListView}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  }
}
export default ChatsList;
