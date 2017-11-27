import React from 'react';
import * as api from  '../api/api.js';
import axios from 'axios';

import BigChatDescription from './BigChatDescription.jsx';
import SmallChatDescription from './SmallChatDescription.jsx';
import Message from './Message.jsx';
import MessagesList from './MessagesList.jsx';
import NewMessageBox from './NewMessageBox.jsx';
import ContactsList from './ContactsList.jsx';
import ChatsList from './ChatsList.jsx';


require('./ChatApp.css');

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateTime=1000;

    axios.all([api.getMessagesByChatId(this.props.chatId), api.getAllUsersByChatId(this.props.chatId),api.getAllChatsByUserId(this.props.userId)])
        .then(axios.spread((respMessages, respUsers, respChats) => {
            this.setState({
                messages: api.toAssociativeArray(respMessages.data),
                users: api.toAssociativeArray(respUsers.data),
                chats: api.toAssociativeArray(respChats.data),
                currentChatId:this.props.chatId,
                currentUserId:this.props.userId,
                newMessageText:''
            },this.setTimer
            );
              //var timerId = setTimeout(this.getNewData(), this.updateTime);
        }));
  }
   tick=()=> {
    this.getNewData();
    this.timerId = setTimeout(this.tick, this.updateTime);
  };

  setTimer=()=>{this.timerId = setTimeout(this.tick,this.updateTime);}


  //let updateTime=1000;
  getNewData = () => {
    axios.all([api.getMessagesByChatId(this.props.chatId), api.getAllUsersByChatId(this.props.chatId), api.getAllChatsByUserId(this.props.userId)])
        .then(axios.spread((respMessages, respUsers, respChats) => {
            let hasNewMessage=(Object.keys(this.state.messages).length < respMessages.data.length);
            let hasNewUsers=(Object.keys(this.state.users).length < respUsers.data.length);
            let hasNewChats=(Object.keys(this.state.chats).length <respChats.data.length);
            if (hasNewMessage || hasNewUsers || hasNewChats) {

              this.updateTime=1000;
              this.setTimer();
                this.setState({
                    messages: api.toAssociativeArray(respMessages.data),
                    users: api.toAssociativeArray(respUsers.data),
                    chats: api.toAssociativeArray(respChats.data)
                });
            } else {
                if (this.updateTime < 300000) {
                    this.updateTime = this.updateTime * 2;
                    console.log("getNewData updateTime=",this.updateTime);
                }
            }
        }));
  }

  componentDidMount() {

  }
  componentWillUnmount() {

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
      api.getMessagesByChatId(this.state.currentChatId)
      .then((responce)=>{
        this.setState({newMessageText:'',messages: api.toAssociativeArray(responce.data)})
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

  changeCurrentChat=(newChatId)=>{
    console.log('changeCurrentChat ',newChatId);
    if(newChatId){
      api.getMessagesByChatId(newChatId).then((response)=>{
        this.setState({currentChatId:newChatId,messages:api.toAssociativeArray(response.data)})
      })
      //this.setState({currentChatId:newChatId})
    }
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
    var colStyle={paddingRight: '5px',
                  paddingLeft: '5px'};
    return (
      <div className="bootstrap">
        <div className="row">
          <div className="col-xs-3" style={colStyle}>
              <ChatsList chats={this.state.chats} currentChatId={this.state.currentChatId}  changeCurrentChatFn={this.changeCurrentChat}/>
          </div>
          <div className="col-xs-9" style={colStyle}>
            <div className="panel panel-default">
              <div className="panel-heading">
                <BigChatDescription chatInfo={this.state.chats[this.state.currentChatId]}/>
              </div>
              <div className="panel-body" >
                <MessagesList currentChatId={this.state.currentChatId} currentUserId={this.props.userId} messages={this.state.messages} users={this.state.users}/>
              </div>
            </div>


          </div>
          <NewMessageBox addMessageFn={this.addMessagge} newMessageText={this.state.newMessageText}/>
      </div>
    </div>
    )
  };

}

export default ChatApp;
