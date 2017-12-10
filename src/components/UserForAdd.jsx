import React, { Component } from 'react';
import XsUser from './XsUser.jsx';

class UserForAdd extends Component {
  constructor(props) {
    super(props);

    this.state={user:this.props.user,
      isCurrentUser:this.props.isCurrentUser };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({user:nextProps.user, isCurrentUser:nextProps.isCurrentUser })
  }

  render() {
    if(!this.state.user){
      return(<div>User are downloading</div>);
    }
    else{
        return (
            <li className={ this.state.isCurrentUser==true ? "active" : ""} key={this.state.user.id}>
              <div className="input-group">
                <span className="input-group-addon">
                  <input key={this.state.user.id} type="checkbox" checked={this.state.user.checked ? 'checked':''} onChange={this.props.checkUserFn.bind(this,this.state.user.id)}/>
                </span>
                <XsUser user={this.state.user}/>
              </div>

            </li>
        );
    }
  }
}

export default UserForAdd;
