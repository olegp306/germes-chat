import React, { Component } from 'react';

class BigChatDescription extends Component {
  render() {
    //console.log(this.props.data);
    let chatInfo=this.props.data;
    return (
      <div className="panel-heading">
        <span className="glyphicon glyphicon-comment"></span> {chatInfo.name}
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
              <span className="glyphicon glyphicon-chevron-down"></span>
            </button>
            <ul className="dropdown-menu slidedown">
              <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-refresh">
                </span>Refresh</a>
              </li>
              <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-ok-sign">
                </span>Available</a>
              </li>
              <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-remove">
                </span>Busy</a>
              </li>
              <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-time">
                </span>Away</a>
              </li>
              <li className="divider"></li>
              <li>
                <a href="http://www.jquery2dotnet.com">
                  <span className="glyphicon glyphicon-off"></span>
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </div>
    );
  }
}

export default BigChatDescription;
