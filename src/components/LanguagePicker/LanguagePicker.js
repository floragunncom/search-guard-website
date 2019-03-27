import React from 'react';
import { injectIntl } from 'react-intl';
import textContent from './textContent';
import './LanguagePicker.scss';
import { Languages } from '../../i18n/locales';
import openCloseButton from '../../images/open_button.svg';

class LanguagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  setLanguage(language) {
    localStorage.setItem('language', language.i18n);
    window.location.reload();
  }

  toggleList() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  handleClickOutside() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    const { isOpen } = this.state;
    const currentLanguage = formatMessage(textContent.language);
    const arrayOfOtherLanguages = Languages.filter(value => {
      return value.full !== currentLanguage;
    });

    return (
      <div className="dropdown">
        <div
          className={`dropdown-header ${
            isOpen ? 'header-open' : 'header-closed'
          }`}
          onClick={() => this.toggleList()}
        >
          <div>{currentLanguage.toUpperCase()}</div>
          <img
            className={`open-and-close-button ${isOpen ? 'close-button' : ''}`}
            src={openCloseButton}
            alt="open-and-close-button"
          />
        </div>
        {isOpen && (
          <div className="dropdown-list">
            {arrayOfOtherLanguages.map(language => (
              <div
                className="dropdown-list-element"
                key={language.i18n}
                onClick={() => this.setLanguage(language)}
              >
                {language.full.toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(LanguagePicker);
