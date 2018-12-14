import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

var Moment = require('moment');

class MessageBoardErrorContainer extends React.Component {
  render() {
    var messages = [];
    for (var i = 0; i < this.props.errorMessages.length; i++) {
      messages.push(
        <MessageBoardErrorMessage 
          key={i}
          nickName='Error' 
          messageText={this.props.errorMessages[i].messageText} 
          timeStampText={Moment().format('MMMM Do YYYY, h:mm:ss a')}
        />
      );
    }
    return <div>{messages}</div>;
  }
}

class MessageBoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: '',
      messageText: '',
      timeStampText: '',
    };
    this.handleNickNameChange = this.handleNickNameChange.bind(this);
    this.handleMessageTextChange = this.handleMessageTextChange.bind(this);
  }

  handleNickNameChange(e) {
    this.setState({
      nickName: e.target.value,
      timeStampText: Moment().format('MMMM Do YYYY, h:mm:ss a'),
    });
  }
  
  handleMessageTextChange(e) {
    this.setState({
      messageText: e.target.value,
      timeStampText: Moment().format('MMMM Do YYYY, h:mm:ss a'),
    });
  }
  
  render() {
    return (
      <div>
        <ul className="collapsible white" data-collapsible="expandable">
          <li className="active">
            <div className="collapsible-header waves-effect waves-yellow light-green accent-1">
              <i className="material-icons">add_comment</i>New Message
            </div>
            <div className="collapsible-body">
              <div className="row">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault(); 
                    this.props.onFormSubmit(this.state)
                  }}
                  className="col s12"
                >
                  <div className="row">
                    <div className="input-field col s12 ">
                      <p>
                        <input
                          onChange={e => this.handleNickNameChange(e)}
                          id="nickname" 
                          placeholder="Nickname" 
                          type="text" 
                          className="validate" 
                          data-length="30"/>
                        <span className="helper-text">(alphanumerical characters)</span>
                      </p>
                    </div>
                    <div className="input-field col s12 ">
                      <p>
                        <textarea
                          onChange={e => this.handleMessageTextChange(e)}
                          id="message" 
                          placeholder="Message" 
                          name="message" 
                          className="materialize-textarea validate" 
                          data-length="300"></textarea>
                        <span className="helper-text">(alphanumerical characters)</span>
                      </p>
                    </div>
                  </div>
                  <div className="row right">
                    <div className="col s12">
                      <p>
                        <button 
                          className="btn black-text waves-effect waves-yellow light-green accent-1" 
                          type="submit" 
                          name="action">
                          Submit
                          <i className="material-icons right">create</i>
                        </button>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

class MessageBoardMessageContainer extends React.Component {
  render() {
    var messages = [];
    for (var i = 0; i < this.props.messageBoardMessages.length; i++) {
      messages.push(
        <MessageBoardMessage 
          key={i} 
          nickName={this.props.messageBoardMessages[i].nickName} 
          messageText={this.props.messageBoardMessages[i].messageText} 
          timeStampText={this.props.messageBoardMessages[i].timeStampText}
        />
      );
    }
    return <div>{messages}</div>;
  }
}

class MessageBoardMessage extends React.Component {
  componentDidMount(){
    var elementList = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elementList, {});
    for (var i = 0; i<instances.length; i++) {
      instances[i].open(0);
    }
  }

  render() {
    return (
      <div>
        <ul className="collapsible white" data-collapsible="expandable">
          <li className="active">
            <div className="collapsible-header waves-effect waves-yellow light-green accent-1">
              <i className="material-icons">message</i>{this.props.nickName} says ({this.props.timeStampText}):
            </div>
            <div className="collapsible-body">
              <i></i>{this.props.messageText}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

class MessageBoardErrorMessage extends React.Component {
  componentDidMount(){
    var elementList = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elementList, {});
    for (var i = 0; i<instances.length; i++) {
      instances[i].open(0);
    }
  }

  render() {
    return (
      <div>
        <ul className="collapsible white" data-collapsible="expandable">
          <li className="active">
            <div className="collapsible-header waves-effect waves-yellow red accent-3">
              <i className="material-icons">error</i>{this.props.nickName} ({this.props.timeStampText}):
            </div>
            <div className="collapsible-body">
            {this.props.messageText}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

class MessageBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      messageBoardMessages: [],
    };
  }

  render() {
    return (
      <div className="container">
        <div className="col s12">
          <h4>MESSAGE<b>BOARD</b>APP</h4>
        </div>
        <div className="col s12">
          <h6 className="right-align"><b>&copy; 2019 NLHARRI</b></h6>
        </div>
        <div>
          <MessageBoardErrorContainer errorMessages={this.state.errorMessages}/>
          <MessageBoardForm onFormSubmit={(formData) => this.handleSubmit(formData)}/>
          <MessageBoardMessageContainer messageBoardMessages={this.state.messageBoardMessages}/>
        </div>
      </div>
    );
  }
  
  // formData is an object with the nickname, message and timestamp
  handleSubmit(formData) {
    const messageBoardMessagesCopy = this.state.messageBoardMessages.slice(); 
    var errorMessagesNew = this.validate(formData);
    if (errorMessagesNew.length === 0) {
      messageBoardMessagesCopy.unshift(formData);
    }
    this.setState({
      errorMessages: errorMessagesNew,
      messageBoardMessages: messageBoardMessagesCopy,
    });
  }
  
  // validate form data
  validate(formData) {
    var errorMessages = [];
    var re = /^[a-zA-Z0-9 ]*$/;
    if (formData.nickName.length > 30) {
      errorMessages.push({ 
        messageText: 'Nickname cannot be longer than 30 characters.' 
      });
    } else if (formData.nickName.length === 0) {
      errorMessages.push({ 
        messageText: 'Nickname cannot be empty.' 
      });
    } else if (!formData.nickName.match(re)) {
      errorMessages.push({ 
        messageText: 'Nickname can contain only characters of the english alphabet, numbers and space.'
      });
    }
    if (formData.messageText.length > 300) {
      errorMessages.push({ 
        messageText: 'Message text cannot be longer than 300 characters.' 
      });
    } else if (formData.messageText.length === 0) {
      errorMessages.push({ 
        messageText: 'Message text cannot be empty.' 
      });
    } else if (!formData.messageText.match(re)) {
      errorMessages.push({ 
        messageText: 'Message text can contain only characters of the english alphabet, numbers and space.'
      });
    }
    return errorMessages;
  }
  
  
}

function App() {
  return (
    <div>
      <MessageBoardContainer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
