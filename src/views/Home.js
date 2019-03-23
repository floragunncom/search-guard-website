import React from 'react';
import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
  headline: {
    id: 'home.headline',
    defaultMessage: 'Welcome to React'
  },
});

const Home = props => {
  const { intl: { formatMessage } } = props;
  return (
    <div>
      <h3>{formatMessage(messages.headline)}</h3>
    </div>
  );
};

export default injectIntl(Home);