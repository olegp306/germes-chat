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
   }

  componentWillReceiveProps(nextProps) {
    this.setState({text:nextProps.newMessageText});
  }

  handMessageAdd=()=>{
    if(this.state.text.trim().length>0){
      this.props.addMessageFn(this.state.text);
      this.props.updateDataFn();
    }
  };

  handIsEnterKey=(event)=>{
    if(event.keyCode==13){
      if(event.ctrlKey==false){
        //console.log('handIsEnterKey ',event.target.value);
        this.handMessageAdd();
      }
      else {
        let oldtext=this.state.text;
        this.setState({text:oldtext+'\n'});
      }
    }
  }

  handleTextChange=(event)=>{
    console.log('handleTextChange ',event.target.value);
    this.setState({text:event.target.value});
  }

  render() {
    return (
      <div className="panel-footer">
        <div className="input-group">
          <textarea
            placeholder="Введите сообщение здесь..."
            rows={4}
            className="form-control custom-control resize-none" rows="3"
            value={this.state.text}
            onChange={this.handleTextChange}
            onKeyUp={this.handIsEnterKey}
          />
        <span className="input-group-addon btn btn-warning btn-send-messsage " onClick={this.handMessageAdd}>Отправить </span>
          </div>
        </div>
    );
  }
}

export default NewMessageBox;
