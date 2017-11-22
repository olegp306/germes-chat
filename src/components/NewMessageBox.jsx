import React, { Component } from 'react';
import * as api from  '../api/api.js';

class NewMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  //при инициализации 1 раз
   componentDidMount() {
     this.state={text:this.props.newMessageText};
     //this.scrollTolastMessage();
   }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    this.setState({text:nextProps.newMessageText});
  }

  handMessageAdd=()=>{
    this.props.addMessageFn(this.state.text);
    //console.log('handMessageAdd');
  };

  handleTextChange=(event)=>{
    this.setState({text:event.target.value});
  }

  render() {
    return (
      <div className="panel-footer">
        <div className="input-group">
          {/*<input id="btn-input" type="text" className="form-control input-sm" placeholder="Введите сообщение здесь..." />*/}
          <textarea
            placeholder="Введите сообщение здесь..."
            rows={4}
            className="form-control input-sm"
            value={this.state.text}
            onChange={this.handleTextChange}
          />
            <span className="input-group-btn">
              <button className="btn btn-warning btn-sm" id="btn-chat" onClick={this.handMessageAdd}>
                Отправить
              </button>
            </span>
          </div>
        </div>
    );
  }
}

export default NewMessageBox;
