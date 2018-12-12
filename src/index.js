import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
  render() {
    return (
      <div>
        <ul class="collapsible white" data-collapsible="expandable">
          <li>
            <div class="collapsible-header active waves-effect waves-yellow light-green accent-1">
              <i class="material-icons">add_comment</i>New Message
            </div>
            <div class="collapsible-body">
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s12 ">
                      <p>
                        <input id="nickname" placeholder="Nickname" type="text" class="validate" length="30" />
                        <span class="helper-text">(alphanumerical characters)</span>
                      </p>
                    </div>
                    <div class="input-field col s12 ">
                      <p>
                        <textarea id="message" placeholder="Message" name="message" form="newmessage" class="materialize-textarea" length="300"></textarea>
                        <span class="helper-text">(alphanumerical characters)</span>
                      </p>
                    </div>
                  </div>
                  <div class="row right">
                    <div class="col s12">
                      <p>
                        <button class="btn black-text waves-effect waves-yellow light-green accent-1" type="submit" name="action">Submit
                          <i class="material-icons right">create</i>
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
    return (
      <div>
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
        <ul class="collapsible white" data-collapsible="expandable">
          <li>
            <div class="collapsible-header active waves-effect waves-yellow light-green accent-1">
              <i class="material-icons">message</i>Harri says (December 11th 2018, 2:23:23 pm)
            </div>
            <div class="collapsible-body">
              <p>"Hello World!"</p>
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
        <ul class="collapsible white" data-collapsible="expandable">
          <li>
            <div class="collapsible-header active waves-effect waves-yellow red accent-3">
              <i class="material-icons">error</i>Error
            </div>
            <div class="collapsible-body">
              <p>"Error!"</p>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

class MessageBoardContainer extends React.Component {
  render() {
    return (
      <div className="container">
        <div class="col s12">
          <h4>MESSAGE<b>BOARD</b>APP</h4>
        </div>
        <div class="col s12">
          <h6 class="right-align"><b>&copy; 2019 NLHARRI</b></h6>
        </div>
        <div>
          <MessageBoardErrorContainer />
          <MessageBoardForm />
          <MessageBoardMessageContainer />
        </div>
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
