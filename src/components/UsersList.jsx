import React, { Component } from 'react';
import * as api from  '../api/api.js';
import XsUser from './XsUser.jsx';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state={
      chatUsers:this.props.chatUsers,
      currentUserId:this.props.currentChatId,
    };
  }

  //при инициализации 1 раз
  componentDidMount() {
     //this.setState({chats:this.props.chats, currentChatId:this.props.currentChatId});
   }

  componentWillReceiveProps(nextProps) {
      this.setState({
      chatUsers:nextProps.chatUsers,
      currentUserId:nextProps.currentUserId}
      );
  }

  render() {
    if(!this.state.chatUsers){
      return <p>Users List  is Loading....</p>
    }
    else {

      let users=this.state.chatUsers;
      var usersListView= new Array;

      for (let prop in users){        
        let user=users[prop];
        usersListView.push (<li className="xs-user-li"><XsUser key={user.id}  user={user} /></li>);
      }
    }

    return (
      <div className="panel panel-primary chats-panel">
        <div className="panel-heading chat-panel-heading">
          <h3 className="panel-title">Участники чата</h3>
        </div>
        <div className="panel-body chat-list">
          <div className="sidebar">
            <ul className="nav nav-sidebar chat-list">
              {usersListView}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersList;
