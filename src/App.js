import React from 'react';
import './index.scss';
// import { injectIntl, defineMessages } from 'react-intl';
import HomePage from './views/HomePage/HomePage';

// const messages = defineMessages({
//   title: {
//     id: 'app.title',
//     defaultMessage: 'Get in touch toucher in get touch',
//   },
//   content1: {
//     id: 'app.content1',
//     defaultMessage: 'To get started, edit',
//   },
//   content2: {
//     id: 'app.content2',
//     defaultMessage: 'and save to reload.',
//   },
// });

const App = () => {
  // const {
  //   intl: { formatMessage },
  // } = props;

  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;
