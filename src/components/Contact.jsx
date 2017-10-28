import React, { Component } from '.../react/react.js';

class Contact extends Component {
  render () {
    let data=this.props.data;
    return (
      <div>
        <li>
          <p>{data.contactName}</p>
        </li>
      </div>
    )
  }
}

export default Contact
