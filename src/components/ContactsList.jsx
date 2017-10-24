import React, { Component } from 'react';
import Contact from './Contact.jsx';


class ContactsList extends Component {
  render() {
    let data=this.props.data;
    let contactsList= data.map(function(item,idex){
      return(
      <Contact key={item.id} data={item}/>
      )
    })
    return (
      <div className="contacts-list">
        <ul>
          {contactsList}
        </ul>
      </div>
    );
  }
}

export default ContactsList;
