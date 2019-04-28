import React from 'react';
import './index.scss';
import { injectIntl, defineMessages } from 'react-intl';
import HomePage from './views/HomePage/HomePage';
import 'materialize-css/dist/css/materialize.min.css';

const messages = defineMessages({
  title: {
    id: 'app.title',
    defaultMessage: 'Get in touch toucher in get touch',
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
      <HomePage />
    </div>
  );
};

export default injectIntl(App);
