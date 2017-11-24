import React, { Component } from 'react';
import * as api from  '../api/api.js';

class ChatsList extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  //при инициализации 1 раз
   componentDidMount() {
     this.setState({text:this.props.chats});
   }

  componentWillReceiveProps(nextProps) {
    this.setState({text:this.props.chats});
  }

  handOnChatClick=()=>{
    console.log('handOnChatClick');
    //this.props.addMessageFn(this.state.text);
  };


  render() {
    return (
      <div className="dropdown">
        <button classNameclassName="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        Dropdown
        <span className="caret"></span>
        </button>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <input id="btn-input" type="text" className="form-control input-sm" placeholder="Введите сообщение здесь..." />
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </div>
    );
  }
}

export default ChatsList;
