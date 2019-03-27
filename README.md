i18n

```npm run extract:messages```
will create this file src/i18n/messages/messages.json with content of every `defineMessages` method.

```npm run manage:translations```
will create a separate messages file for each language.

**Add new language to the project**
1. In `index.js` add ```{new language abbreviation}LocaleData from 'react-intl/locale-data/{here again the abbreviation for the new language}';```
e.g. ```import esLocaleData from 'react-intl/locale-data/es';```
2. Also in `index.js` add the command ```addLocaleData({new just imported language data});```
e.g. ```addLocaleData(deLocaleData);```
3. In `translationRunner.js` add the abbreviation to the array `languages`
e.g. ```languages: ['en', 'es', 'de'],```
4. Now run ```npm run manage:translations```
5. In the `src/locales/index.js` add an object to the `Languages` array
e.g.   
```
{
  full: 'Deutsch',
  i18n: 'de',
}
```
7. In the same file add the json import to the top of the file 
eg. ```import de from './de.json';```
8. In the same file add the language abbreviation to the `Translations` object
e.g. ```export const Translations = { de, en, es };```
9. In the newly created translation json (e.g. `src/i18n/locales/de.json`) you can now translate the strings.