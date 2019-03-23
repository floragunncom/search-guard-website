import React, { Component } from 'react';
import { injectIntl, defineMessages } from "react-intl";
import './App.scss';

const messages = defineMessages({
  title: {
    id: 'app.title',
    defaultMessage: 'Welcome to React'
  },
  content1: {
    id: 'app.content1',
    defaultMessage: 'To get started, edit'
  },
  content2: {
    id: 'app.content2',
    defaultMessage: 'and save to reload.'
  },
});

const ENGLISH = 'en';
const GERMAN = 'de';

class App extends Component {
  setLanguage(language) {
    localStorage.setItem('language', language);
    window.location.reload();
  }
  render() {
    const { intl: { formatMessage } } = this.props;
    return (
      <div>
        <button onClick={() => this.setLanguage(ENGLISH)}>English</button>
        <button onClick={() => this.setLanguage(GERMAN)}>Deutsch</button>
        <h1 className="App-title">{formatMessage(messages.title)}</h1>
        <div>
          {formatMessage(messages.content1)} <code>src/App.js</code> {formatMessage(messages.content2)}
        </div>
      </div>
    );
  }
}

export default injectIntl(App);
