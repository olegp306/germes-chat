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

const INITIAL_UPDATE_TIME=10000;
const INITIAL_TIME_TO_READ_UNREAD_CHAT_MESSSAGE=2000;

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatId:this.props.chatId,
      currentUserId:this.props.userId
    };

    this.updateTime=INITIAL_UPDATE_TIME;

    axios.all([api.getMessagesByChatId(this.props.chatId), api.getUsersByChatId(this.props.chatId),api.getUserChatsInfos(this.props.userId), api.getUsersAvailableToAdd(this.props.chatId),api.getUnreadMessage(this.props.userId)])
        .then(axios.spread((respMessages, respUsers, respChats, respUsersAvailableToAdd, respunreadMessages) => {
            this.setState({
                messages: api.toAssociativeArray(respMessages.data),
                chatUsers: api.toAssociativeArray(respUsers.data),
                chats: api.toAssociativeArray(respChats.data),
                availableToAddUsers:api.toAssociativeArray(respUsersAvailableToAdd.data),
                unreadMessages:api.toAssociativeArray(respunreadMessages.data,"messageId"),
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

  setTimer=()=>{
    this.timerId = setTimeout(this.tick,this.updateTime);
  }

  //let updateTime=1000;
  getNewData = () => {
    console.log("ЗАпуск  getNewData");
    axios.all([api.getMessagesByChatId(this.state.currentChatId), api.getUsersByChatId(this.state.currentChatId), api.getUserChatsInfos(this.state.currentUserId),api.getUsersAvailableToAdd(this.state.currentChatId),api.getUnreadMessage(this.state.currentUserId)])
        .then(axios.spread((respMessages, respUsers, respChats,respUsersAvailableToAdd,respunreadMessages) => {
            let hasNewMessage=(Object.keys(this.state.messages).length != respMessages.data.length);
            let hasNewChatUsers=(Object.keys(this.state.chatUsers).length != respUsers.data.length);
            let hasNewChats=(Object.keys(this.state.chats).length != respChats.data.length);
            let hasNewUsersAvailableToAdd=(Object.keys(this.state.availableToAddUsers).length != respUsersAvailableToAdd.data.length);
            let hasNewUnreadMessages=(Object.keys(this.state.unreadMessages).length <respunreadMessages.data.length);
            if (hasNewMessage || hasNewChatUsers || hasNewChats || hasNewUnreadMessages || hasNewUsersAvailableToAdd ) {
            //  console.log('hasNewMessage',hasNewMessage);
              //console.log('hasNewChatUsers',hasNewChatUsers);
              //console.log('hasNewChats',hasNewChats);
              //console.log('hasNewUnreadMessages',hasNewUnreadMessages);
              let newState={};

              if(hasNewMessage){
                newState.messages= api.toAssociativeArray(respMessages.data);
              }
              if(hasNewChatUsers){
                newState.chatUsers= api.toAssociativeArray(respUsers.data);
              }
              if(hasNewChats){
                newState.chats= api.toAssociativeArray(respChats.data);
              }
              if(hasNewUsersAvailableToAdd){
                newState.availableToAddUsers= api.toAssociativeArray(respUsersAvailableToAdd.data);
              }
              if(hasNewUnreadMessages){
                newState.unreadMessages= api.toAssociativeArray(respunreadMessages.data,"messageId");
              }


              this.updateTime=INITIAL_UPDATE_TIME;

                // this.setState({
                //     messages: api.toAssociativeArray(respMessages.data),
                //     chatUsers: api.toAssociativeArray(respUsers.data),
                //     chats: api.toAssociativeArray(respChats.data),
                //     availableToAddUsers:api.toAssociativeArray(respUsersAvailableToAdd.data),
                //     unreadMessages:api.toAssociativeArray(respunreadMessages.data)
                //
                // }

                this.setState(newState,()=>{
                  console.log("Данные Изменились getNewData updateTime=",this.updateTime);
                  //this.updateTime = this.updateTime * 1.4;
                  });
            }
             else {
                if (this.updateTime < 300000) {
                    this.updateTime = this.updateTime * 1.4;
                    console.log("Данные НЕ Изменились getNewData updateTime=",this.updateTime);
                }
            }
        }));
  }

  updateData= () =>{
    this.updateTime=INITIAL_UPDATE_TIME;
    this.getNewData();
  }

  componentDidMount() {

  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.timerId);
  }

  addMessagge=(messageText)=>{
    let message={
      chatId: this.state.currentChatId,
      userId: this.state.currentUserId,
      name: messageText
    };

    api.addMessage(message)
    .then((response)=>{
      //console.log(response);
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
    if(newChatId){
      this.setState({currentChatId:newChatId});
      api.getMessagesByChatId(newChatId).then((response)=>{
        this.setState({messages:api.toAssociativeArray(response.data),currentChatId:newChatId},()=>{this.updateData();this.messagesWasRead(this.state.currentChatId,this.state.currentUserId);})
      })
      //this.setState({currentChatId:newChatId})
    }
  }

  messagesWasRead=(readMessages)=>{
    if(Object.keys(readMessages).length>0){
      let request=[];
      for(let prop in readMessages)
      {
        let item=readMessages[prop];
        request.push({id:item.id,IduserId:item.userId, chatId:item.chatId, message:{id:item.messageId}});
      }
      api.updateMessagesReadStatus(request).then((responce)=>{
        api.getUnreadMessage(this.state.currentUserId).then((response)=>{
          this.setState({unreadMessages:api.toAssociativeArray(response.data,"messageId"),})
        })
      })
      console.log('messagesWasRead');
    }
  }

  addUsers=(users)=>{
    if(users)
    {
      let requestData=[];
      let currentChatId=this.state.currentChatId;
      for(let user in users)
      {
        let data={};
        requestData.push({chatId:currentChatId,userId:user})
      }
      api.addUsersInChat(requestData).
      then((response)=>{
          console.log('addUsersInChat',response);
          api.getMessagesByChatId(this.state.currentChatId)
          .then((responce)=>{
            axios.all([api.getUsersByChatId(this.state.currentChatId), api.getUsersAvailableToAdd(this.state.currentChatId)])
                .then(axios.spread((respUsers,respUsersAvailableToAdd) => {
                      this.setState({
                        chatUsers: api.toAssociativeArray(respUsers.data),
                        availableToAddUsers:api.toAssociativeArray(respUsersAvailableToAdd.data)
                      },this.addMessageAboutNewUser(users));
                }));
          })

      })
    }
  //  console.log('addUsers',usersIds);
  }
  addMessageAboutNewUser=(users)=>{
    console.log('addMessageAboutNewUser',users);
    if(Object.keys(users).length>0)
    {
      let message='В Чат добавлены:';
      for(let useId in users){
        message=message+" " + users[useId].name+",";
      }
      this.addMessagge( message.substr(0,message.length-1));
    }
  }

  componentWillUpdate(nextProps, nextState) {

  }



  render () {
    if( !this.state.chatUsers || !this.state.messages || !this.state.chats  )
    {
      return <p>MessagesList Loading....</p>
    }
    var colStyle={paddingRight: '5px', paddingLeft: '5px', paddingTop:'5px',paddingBottom:'5px'};
    //console.log('{this.state.chats[this.state.currentChatId]}',this.state.chats,this.state.currentChatId);
    //console.log(this.state.chats[this.state.currentChatId]);
    return (
      <div className="bootstrap">
        <div className="row">
          <div className="col-xs-3 no-padding-right">
              <ChatsList chats={this.state.chats}
                currentChatId={this.state.currentChatId}
                changeCurrentChatFn={this.changeCurrentChat}
                updateDataFn={this.updateData}
                unreadMessages={this.state.unreadMessages}/>
          </div>
          <div className="col-xs-9 xs-padding-left" >
            <div className="panel panel-primary messages-panel">
              <div className="panel-heading chat-panel-heading">
                <BigChatDescription chatInfo={this.state.chats[this.state.currentChatId]}
                   addUsersFn={this.addUsers}
                   chatUsers={this.state.chatUsers}
                   availableToAddUsers={this.state.availableToAddUsers}
                   currentUserId={this.props.userId}/>
              </div>
              <MessagesList
                currentChatId={this.state.currentChatId}
                currentUserId={this.props.userId}
                messages={this.state.messages}
                unreadMessages={this.state.unreadMessages}
                users={this.state.chatUsers}
                updateDataFn={this.updateData}
                messagesWasReadFn={this.messagesWasRead}/>
            </div>


          </div>
          <NewMessageBox addMessageFn={this.addMessagge} newMessageText={this.state.newMessageText} updateDataFn={this.updateData}/>
      </div>
    </div>
    )
  };

}

export default ChatApp;
