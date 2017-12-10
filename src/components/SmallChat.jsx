import React, { Component } from 'react';

class SmallChat extends Component {
  constructor(props) {
    super(props);

    this.state={};
      this.state={chatInfo:this.props.chatInfo,
        isCurrentChat: this.props.isCurrentChat,
        changeCurrentChatFn:this.props.changeCurrentChatFn,
        unreadMessagesCount:this.props.unreadMessagesCount
       } ;
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({chatInfo:nextProps.chatInfo,
      isCurrentChat: nextProps.isCurrentChat,
      changeCurrentChatFn:nextProps.changeCurrentChatFn,
      unreadMessagesCount:nextProps.unreadMessagesCount });
  }

  handOnChatClick=(e)=>{
    if(e.target.id){
      this.state.changeCurrentChatFn(e.target.id)
    }
  };

  render() {
    if(!this.state.chatInfo){
      return(<div>Chats are downloading</div>);
    }
    else{
        return (
            <li className={ this.state.isCurrentChat==true ? "active" : ""} id={this.state.chatInfo.id}>
              <a  id={this.state.chatInfo.id} href="#" onClick={this.handOnChatClick}>{this.state.chatInfo.name} ({this.state.unreadMessagesCount})</a>
            </li>
        );
    }
  }
}

export default SmallChat;
