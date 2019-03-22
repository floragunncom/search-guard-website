import React, { Component } from 'react';
import { injectIntl, defineMessages } from "react-intl";

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

class App extends Component {
  render() {
    const { intl: { formatMessage } } = this.props;
    return (
      <div>
        <a href="/?locale=en">English</a>
        <a href="/?locale=de">Deutsch</a>
        <h1 className="App-title">{formatMessage(messages.title)}</h1>
        <div>
          {formatMessage(messages.content1)} <code>src/App.js</code> {formatMessage(messages.content2)}
        </div>
      </div>
    );
  }
}

export default injectIntl(App);
