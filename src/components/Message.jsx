import React, { Component } from 'react';

import AvatarHelper from '../utils/avatarHelper.js';

class Message extends Component {
  constructor(props) {
    super(props);
    //this.state={};

    this.state={
      messageInfo:this.props.messageInfo,
      isMyMessage:this.props.isMyMessage,
      isNewMessage:this.props.isNewMessage,
      userInfo:this.props.userInfo
    };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        messageInfo:nextProps.messageInfo,
        isMyMessage:nextProps.isMyMessage,
        isNewMessage:nextProps.isNewMessage,
        userInfo:nextProps.userInfo });
    }


  getUserPhoto(username){
    let avatar=new AvatarHelper();
    return avatar.getUserPhoto(username);
  }

  render() {
    let message=this.state.messageInfo;
    let isMyMessage=this.state.isMyMessage;
    let isNewMessage=(!this.state.isNewMessage ? false: true);
    let userInfo=this.state.userInfo;

    return (

      <div className={isNewMessage==true ? "message new-message" : "message"}>

        <li className={isMyMessage==true ? "right clearfix" : "left clearfix"}>
          <span className={isMyMessage==true ? "chat-img pull-right" : "chat-img pull-left"}>
            <img src={this.getUserPhoto(userInfo.name)} alt="User Avatar" className="img-circle" />
          </span>
            <div className= "chat-body clearfix" >
                <div className="header">
                    <strong className={isMyMessage==true ? "primary-font pull-right" : "primary-font"}>
                      {userInfo.name}
                    </strong>
                    <small className={isMyMessage==true ? "text-muted" : "pull-right text-muted"}>
                      <span className="glyphicon glyphicon-time ">
                      </span>
                      {message.creationDate}
                    </small>
                </div>
                <p>
                  {message.text}
                </p>
            </div>
        </li>
      </div>
    );
  }
}

export default Message;
