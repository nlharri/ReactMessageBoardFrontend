import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MessageBoardErrorContainer extends React.Component {
  render() {
    return (
      <div>
        <h2>Error Container</h2>
        <MessageBoardErrorMessage />
        <MessageBoardErrorMessage />
        <MessageBoardErrorMessage />
      </div>
    );
  }
}

class MessageBoardForm extends React.Component {
  render() {
    return (
      <div>
        <h2>Form</h2>
      </div>
    );
  }
}

class MessageBoardMessageContainer extends React.Component {
  render() {
    return (
      <div>
        <h2>Message Container</h2>
        <MessageBoardMessage />
        <MessageBoardMessage />
        <MessageBoardMessage />
      </div>
    );
  }
}

class MessageBoardMessage extends React.Component {
  render() {
    return (
      <div>
        <h3>Message</h3>
      </div>
    );
  }
}

class MessageBoardErrorMessage extends React.Component {
  render() {
    return (
      <div>
        <h3>Error Message</h3>
      </div>
    );
  }
}

class MessageBoardContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>Message Board Container</h1>
        <MessageBoardErrorContainer />
        <MessageBoardForm />
        <MessageBoardMessageContainer />
      </div>
    );
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
