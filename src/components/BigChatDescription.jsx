import React, { Component } from 'react';
import UsersListWithCheck from './UsersListWithCheck.jsx';
import UsersList from './UsersList.jsx';

//import {testExternalParam} from  '../index.js';

class BigChatDescription extends Component {
  constructor(props) {
    super(props);

    //this.state={};
    this.state={
      chatInfo:this.props.chatInfo,
      availableToAddUsers:this.props.availableToAddUsers,
      chatUsers:this.props.chatUsers
    } ;
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        chatInfo:nextProps.chatInfo,
        availableToAddUsers:nextProps.availableToAddUsers,
        chatUsers:nextProps.chatUsers
      });
  }

  handleChildClick=(e)=> {
   e.stopPropagation();

   console.log('handleChildClick',e);
 }

  render() {

    if(this.state.chatInfo==null || !this.state.chatInfo )
    {
      return <p>BigChatDescription Loading....</p>
    }


    //console.log(this.props.data);
    let chatInfo=this.state.chatInfo;
    let chatUsers=this.state.chatUsers;
    let chatUsersCount=Object.keys(chatUsers).length;
    return (
      <div>
        <h3 className="panel-title text-center in-one-row">
          {chatInfo.description}
          {/*Всего: кол-во человек в чате)*/}
        </h3>

        <div className="btn-group pull-right">
          <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
              <span className="glyphicon glyphicon-plus" title="Добавить новых участников в чат">Добавить</span>
          </button>
          <div className="dropdown-menu slidedown user-dropdown-menu" onClick={this.handleChildClick}>
            <UsersListWithCheck
              chatUsers={this.props.users}
              availableToAddUsers={this.props.availableToAddUsers}
              currentUserId={this.props.currentUserId}
              addUsersFn={this.props.addUsersFn} />
          </div>
        </div>

        <div className="btn-group pull-left">
          <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
              <span className="glyphicon glyphicon-user"> {chatUsersCount}</span>
          </button>
          <div className="dropdown-menu slidedown user-dropdown-menu" >
            <UsersList
               chatUsers={this.props.chatUsers}
               currentUserId={this.props.currentUserId} />
          </div>
        </div>

      </div>
    );
  }
}

export default BigChatDescription;
