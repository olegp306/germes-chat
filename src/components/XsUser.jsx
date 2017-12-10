import React, { Component } from 'react';
import AvatarHelper from '../utils/avatarHelper.js';

class XsUser extends Component {
  constructor(props) {
    super(props);

    this.state={};
  }
  getUserPhoto(username){
    let avatar=new AvatarHelper();
    return avatar.getUserPhoto(username,25);
  }


  render() {
    if(!this.props.user){
      return(<div>User is downloading</div>);
    }
    else{
        return (
          <div>
            <span className="chat-img chat-img pull-left">
              <img src={this.getUserPhoto(this.props.user.name)} alt="User Avatar" className="img-circle" />
            </span>
            <a  id={this.props.user.id} href="#">{this.props.user.name} </a>
          </div>
        );
    }
  }
}

export default XsUser;
