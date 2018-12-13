import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var Moment = require('moment');

class MessageBoardErrorContainer extends React.Component {
  render() {
    return (
      <div>
        <MessageBoardErrorMessage />
        <MessageBoardErrorMessage />
        <MessageBoardErrorMessage />
      </div>
    );
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
          <li>
            <div className="collapsible-header active waves-effect waves-yellow light-green accent-1">
              <i className="material-icons">add_comment</i>New Message
            </div>
            <div className="collapsible-body">
              <div className="row">
                <form onSubmit={(e) => {e.preventDefault(); this.props.onFormSubmit(this.state)}} className="col s12">
                  <div className="row">
                    <div className="input-field col s12 ">
                      <p>
                        <input
                          onChange={e => this.handleNickNameChange(e)}
                          id="nickname" 
                          placeholder="Nickname" 
                          type="text" 
                          className="validate" 
                          length="30" />
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
                          className="materialize-textarea" 
                          length="300"></textarea>
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
      messages.unshift(
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
  render() {
    return (
      <div>
        <ul className="collapsible white" data-collapsible="expandable">
          <li>
            <div className="collapsible-header active waves-effect waves-yellow light-green accent-1">
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
  render() {
    return (
      <div>
        <ul className="collapsible white" data-collapsible="expandable">
          <li>
            <div className="collapsible-header active waves-effect waves-yellow red accent-3">
              <i className="material-icons">error</i>Error
            </div>
            <div className="collapsible-body">
              <p>"Error!"</p>
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
  
  // formData is an array of messages
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
    console.log("handleSubmit was called with: " + formData.nickName + " " + formData.messageText + " " + formData.timeStampText);
  }
  
  // validate form data
  validate(formData) {
    return [];
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
