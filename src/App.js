import React from 'react';
import { injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'app.title',
    defaultMessage: 'Welcome to React',
  },
  content1: {
    id: 'app.content1',
    defaultMessage: 'To get started, edit',
  },
  content2: {
    id: 'app.content2',
    defaultMessage: 'and save to reload.',
  },
});

const ENGLISH = 'en';
const GERMAN = 'de';

const App = props => {
  const setLanguage = language => {
    localStorage.setItem('language', language);
    window.location.reload();
  };

  const {
    intl: { formatMessage },
  } = props;
  return (
    <div>
      <button type="button" onClick={() => setLanguage(ENGLISH)}>
        English
      </button>
      <button type="button" onClick={() => setLanguage(GERMAN)}>
        Deutsch
      </button>
      <h1 className="App-title">{formatMessage(messages.title)}</h1>
      <div>
        {formatMessage(messages.content1)} <code>src/App.js</code>
        {formatMessage(messages.content2)}
      </div>
    </div>
  );
};

export default injectIntl(App);
