import React, { Component } from 'react';

class NewMessageBox extends Component {
  render() {
    return (
      <div className="panel-footer">
        <div className="input-group">
          <input id="btn-input" type="text" className="form-control input-sm" placeholder="Введите сообщение здесь..." />
            <span className="input-group-btn">
              <button className="btn btn-warning btn-sm" id="btn-chat">
                Отправить
              </button>
            </span>
          </div>
        </div>
    );
  }
}

export default NewMessageBox;
