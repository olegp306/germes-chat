import React, { Component } from 'react';
import * as api from  '../api/api.js';
import SmallChat from './SmallChat.jsx';

class ChatsList extends Component {
  constructor(props) {
    super(props);
    //this.state={};

    this.state={
      chats:this.props.chats,
      displayedChats:this.props.chats,
      currentChatId:this.props.currentChatId,
      unreadMessages:this.props.unreadMessages,
      searchQuery:''
    };
  }

  //при инициализации 1 раз
  componentDidMount() {
     //this.setState({chats:this.props.chats, currentChatId:this.props.currentChatId});
   }

  componentWillReceiveProps(nextProps) {
      this.setState({
      chats:nextProps.chats,
      currentChatId:nextProps.currentChatId,
      displayedChats:nextProps.chats,
      unreadMessages:nextProps.unreadMessages
     });

    //filterChats(this.state.searchQuery);
  }

  handleSearch=(event)=>{
    //console.log(event.target.value);
    let searchQuery=event.target.value.toLowerCase();
    let newDisplayedChats=this.filterChats(searchQuery);

    this.setState({searchQuery:event.target.value,displayedChats:newDisplayedChats})
    //this.filterChats(searchQuery);
  }

  filterChats=(searchQuery)=>{
    //let searchQuery=this.state.searchQuery;
    let newDisplayedChats={};

    if(searchQuery==''){
      return this.state.users;
    }
    else{
      for (let prop in this.state.users){
        let chat=this.state.users[prop];
          if(chat.name.toLowerCase().indexOf(searchQuery.toLowerCase())!==(-1)){
            newDisplayedChats[prop]=this.state.users[prop];
          }
      }
      return newDisplayedChats;
    }
  }

  clearSearchQuery=()=>{

    this.setState({searchQuery:'',displayedChats:this.props.chats});
  }

  getUnreadMessagesCount=(messagesReadInfo,chatId)=>{
    let unReadMessagesCount=0;
    for(let prop in messagesReadInfo)
    {
      if(messagesReadInfo[prop].chatId==chatId){
        unReadMessagesCount++;
      }
    }
    return unReadMessagesCount;

  }


  render() {
    if(!this.state.chats)
    {
      return <p>ChatsList Loading....</p>
    }
    else {

      let chats=this.state.displayedChats;
      let chatsListView= new Array;

      for (let prop in chats)
      {
        let chat=chats[prop];
        let isCurrentChat=false;
        if(chat.id==this.state.currentChatId){
          isCurrentChat=true;
        }

        let unreadMessagesCount= this.getUnreadMessagesCount(this.state.unreadMessages,chat.id);
        chatsListView.push (<SmallChat key={chat.id}
          chatInfo={chat}
          isCurrentChat={isCurrentChat}
          unreadMessagesCount={unreadMessagesCount}
          changeCurrentChatFn={this.props.changeCurrentChatFn}
          updateDataFn={this.props.updateData} />);
      }

    return (
      <div className="panel panel-primary chats-panel">
        <div className="panel-heading chat-panel-heading">
          <h3 className="panel-title">Чаты<button className="btn btn-primary refresh-btn" onClick={this.props.updateDataFn}><span className="glyphicon glyphicon-refresh"></span> </button></h3>

        </div>
        <div className="panel-body chat-list">
          <div className="input-group search-input">
            <input type="text" className="form-control" placeholder="Поиск чата" onChange={this.handleSearch} value={this.state.searchQuery}/>
            <span className="input-group-btn">
              <button className="btn btn-default"  type="button" onClick={this.clearSearchQuery} data-toggle="tooltip" data-placement="right" title="Очистить строку поиска" ><span className="glyphicon glyphicon-search"></span></button>
            </span>
          </div>

          <div className="sidebar">
            <ul className="nav nav-sidebar chat-list">
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
