import React from 'react';

const ENGLISH = 'en';
const GERMAN = 'de';

const LanguagePicker = () => {
  const setLanguage = language => {
    localStorage.setItem('language', language);
    window.location.reload();
  };

  return (
    <div>
      <button type="button" onClick={() => setLanguage(ENGLISH)}>
        English
      </button>
      <button type="button" onClick={() => setLanguage(GERMAN)}>
        Deutsch
      </button>
    </div>
  );
};

export default LanguagePicker;
