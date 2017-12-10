import React, { Component } from 'react';
import * as api from  '../api/api.js';
import UserForAdd from './UserForAdd.jsx';

class UsersListWithCheck extends Component {
  constructor(props) {
    super(props);
    //this.state={};

    this.state={
      chatUsers:this.props.users,
      availableToAddUsers:this.props.availableToAddUsers,
      currentUserId:this.props.currentChatId,
      displayedUsers:this.props.availableToAddUsers,
      searchQuery:''
    };
  }

  //при инициализации 1 раз
  componentDidMount() {
     //this.setState({chats:this.props.chats, currentChatId:this.props.currentChatId});
   }

  componentWillReceiveProps(nextProps) {
      this.setState({
      chatUsers:nextProps.users,
      availableToAddUsers:nextProps.availableToAddUsers,
      currentUserId:nextProps.currentUserId,
      displayedUsers:nextProps.availableToAddUsers });

    //filterChats(this.state.searchQuery);
  }

  handleSearch=(event)=>{
    //console.log(event.target.value);
    let searchQuery=event.target.value.toLowerCase();
    let newDisplayedUsers=this.filterUsers(searchQuery);

    this.setState({searchQuery:event.target.value,displayedUsers:newDisplayedUsers})
    //this.filterChats(searchQuery);
  }

  filterUsers=(searchQuery)=>{
    //let searchQuery=this.state.searchQuery;
    let newDisplayedUsers={};
    let availableToAddUsers=this.state.availableToAddUsers;


    if(searchQuery==''){
      return availableToAddUsers;
    }
    else{
      for (let prop in availableToAddUsers){
        let user=availableToAddUsers[prop];
          if(user.name.toLowerCase().indexOf(searchQuery.toLowerCase())!==(-1)){
            newDisplayedUsers[prop]=availableToAddUsers[prop];
          }
      }
      return newDisplayedUsers;
    }
  }

  clearSearchQuery=()=>{
    this.setState({searchQuery:'',displayedChats:this.props.availableToAddUsers});
  }

  checkUser=(checkedUserId,event)=>{
    //console.log('checkUser event.target.key',event.target.key);
    if(checkedUserId){
      let userId=checkedUserId;
      let checkedUser=this.state.availableToAddUsers[userId];

      if(!checkedUser.checked){
        checkedUser.checked=false;
      }

      if(checkedUser.checked==false){
        checkedUser.checked=true;
      }
      else if(checkedUser.checked==true){
        checkedUser.checked=false;
      }
      let newUsers=this.state.availableToAddUsers;

      newUsers[userId]=checkedUser;

      this.setState({availableToAddUsers:newUsers});
    }
  }
  addUsers=(event)=>
  {
    let selectedUsers =this.getSelectedUsers(this.state.availableToAddUsers);
    this.props.addUsersFn(selectedUsers);
  }

  getSelectedUsers=(users)=>{
    let selectedUsers={};
      for (let prop in users)
      {
        if(users[prop].checked){
          selectedUsers[prop]=users[prop];
        }
      }
      return selectedUsers;
  }


  render() {
    if(!this.state.availableToAddUsers)
    {
      return <p>ChatsList Loading....</p>
    }
    else {

      let users=this.state.displayedUsers;
      let usersListView= new Array;

      for (let prop in users)
      {
        let user=users[prop];
        let isCurrentUser=false;
        if(user.id==this.state.isCurrentUser){
          isCurrentUser=true;
        }

        usersListView.push (<UserForAdd key={user.id} user={user} isCurrentUser={isCurrentUser} checkUserFn={this.checkUser}/>);
      }

    return (
      <div className="panel panel-primary chats-panel">
        <div className="panel-heading chat-panel-heading">
          <h3 className="panel-title">Добавьте участников
            {/* <button className="btn btn-primary refresh-btn" onClick={this.props.updateDataFn}><span className="glyphicon glyphicon-refresh"></span> </button>*/}

            </h3>

        </div>
        <div className="panel-body chat-list">
          <div className="input-group search-input">
            <input type="text" className="form-control" placeholder="Введите имя" onChange={this.handleSearch} value={this.state.searchQuery}/>
            <span className="input-group-btn">
              <button className="btn btn-default"  type="button" onClick={this.clearSearchQuery} data-toggle="tooltip" data-placement="right" title="Очистить строку поиска" ><span className="glyphicon glyphicon-search"></span></button>
            </span>
          </div>

          <div className="sidebar">
            <span className="label label-default">Доступные контакты</span>
            <ul className="nav nav-sidebar chat-list">
              {usersListView}
            </ul>
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.addUsers}>Добавить</button>
      </div>
    );
  }
  }
}
export default UsersListWithCheck;
