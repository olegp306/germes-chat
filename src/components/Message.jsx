import React, { Component } from 'react';

class Message extends Component {
  hashCode=function (str) { // java String#hashCode
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
  }

  intToRGB=function (i){
      var c = (i & 0x00FFFFFF)
          .toString(16)
          .toUpperCase();

      return "00000".substring(0, 6 - c.length) + c;
  }
  //To convert you would do: intToRGB(hashCode(your_string))

  getUserPhoto=function(username){
    let nameArr=username.split(' ');
    let result='';
    for(let i=0;i<nameArr.length;i++)
    {
      result=result +' ' + nameArr[i].substring(0,1);
    }
    return 'http://placehold.it/50/'+this.intToRGB(this.hashCode(result))+'/fff&text='+result;
  };

  render() {
    let data=this.props.message;
    let isMyMessage=this.props.isMyMessage;
    let user=this.props.user;

    return (
      <div className="Message">
        <li className={ isMyMessage==true ? "right clearfix" : "left clearfix"}>
          <span className={isMyMessage==true ? "chat-img pull-right" : "chat-img pull-left"}>
            <img src={this.getUserPhoto(user.name)} alt="User Avatar" className="img-circle" />
          </span>
            <div className= "chat-body clearfix" >
                <div className="header">
                    <strong className={isMyMessage==true ? "primary-font pull-right" : "primary-font"}>
                      {user.name}
                    </strong>
                    <small className={isMyMessage==true ? "text-muted" : "pull-right text-muted"}>
                      <span className="glyphicon glyphicon-time">
                      </span>
                      {data.creationDate}
                    </small>
                </div>
                <p>
                  {data.text}
                </p>
            </div>
        </li>
      </div>
    );
  }
}

export default Message;
