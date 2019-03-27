import React from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import LanguagePicker from './components/LanguagePicker/LanguagePicker';

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

const App = props => {
  const {
    intl: { formatMessage },
  } = props;

  return (
    <div>
      <LanguagePicker />
      <h1 className="App-title">{formatMessage(messages.title)}</h1>
      <div>
        {formatMessage(messages.content1)} <code>src/App.js</code>
        {formatMessage(messages.content2)}
      </div>
    </div>
  );
};

export default injectIntl(App);
