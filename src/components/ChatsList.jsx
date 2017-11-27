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
      displayedChats:nextProps.chats });

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
      return this.state.chats;
    }
    else{
      for (let prop in this.state.chats){
        let chat=this.state.chats[prop];
          if(chat.name.indexOf(searchQuery)!==(-1)){
            newDisplayedChats[prop]=this.state.chats[prop];
          }
      }
      return newDisplayedChats;
    }
  }

  clearSearchQuery=()=>{

    this.setState({searchQuery:'',displayedChats:this.props.chats});
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

        chatsListView.push (<SmallChat key={chat.id} chatInfo={chat} isCurrentChat={isCurrentChat} changeCurrentChatFn={this.props.changeCurrentChatFn} />);
      }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Чаты</h3>
        </div>
        <div className="panel-body">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Поиск чата" onChange={this.handleSearch} value={this.state.searchQuery}/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this.clearSearchQuery} ata-toggle="tooltip" data-placement="right" title="Очистить строку поиска" >X</button>
            </span>
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
