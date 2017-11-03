import React, { Component } from 'react';

class Message extends Component {
  render() {
    let data=this.props.message;
    let isMyMessage=this.props.isMyMessage;
    let user=this.props.user;
    //console.log('Message');
    //console.log(user);
    return (
      <div className="Message">
        <li className={ isMyMessage==true ? "right clearfix" : "left clearfix"}>
          <span className={isMyMessage==true ? "chat-img pull-right" : "chat-img pull-left"}>
            <img src={user.photo} alt="User Avatar" className="img-circle" />
          </span>
            <div className= "chat-body clearfix" >
                <div className="header">
                    <strong className={isMyMessage==true ? "primary-font pull-right" : "primary-font"}>
                      {user.name}
                    </strong>
                    <small className={isMyMessage==true ? "text-muted" : "pull-right text-muted"}>
                      <span className="glyphicon glyphicon-time">
                      </span>
                      {data.createDateTime}
                    </small>
                </div>
                <p>
                  {data.messageText}
                </p>
            </div>
        </li>
      </div>
    );
  }
}

export default Message;
