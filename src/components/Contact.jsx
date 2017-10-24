import React, { Component } from 'react';

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
