import React from 'react';
import events from '../../Api/contentfulEvents.json';
import Markdown from 'markdown-to-jsx';
import './News.scss';

const News = () => {
  return (
    <div className="news__wrapper" id="news">
      <div className="row">
        <div className="news__headline">News & Events</div>
        <div className="news__items-wrapper">
          {events.slice(0, 6).map(event => {
            const item = event.fields;
            const monthNames = [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'June',
              'July',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ];
            const labels = item.labels ? item.labels.join(', ') : null;
            const startDate = new Date(item.date);
            const endDate = new Date(item.endDate);
            const year = startDate.getFullYear();
            const startMonth = monthNames[startDate.getMonth()];
            const endMonth = monthNames[endDate.getMonth()];
            const startDay = startDate.getDate();
            const endDay = endDate.getDate();
            let date;
            if (item.endDate !== undefined) {
              if (startMonth === endMonth) {
                date = `${startDay}. - ${endDay}. ${startMonth} ${year}`;
              } else {
                date = `${startDay}. ${startMonth} - ${endDay}. ${endMonth} ${year}`;
              }
            } else {
              date = `${startDay}. ${startMonth} ${year}`;
            }
            return (
              <a
                href={item.eventLink}
                className="news-item"
                key={event.sys.id}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundImage: `url(${item.backgroundImage.fields.file.url})`,
                }}
              >
                <div className="news-item__info">
                  <div className="news-item__info-date">{date}</div>
                  <div className="news-item__info-headline">
                    {labels === null ? null : (
                      <span className="news-item__info-labels">{labels} |</span>
                    )}{' '}
                    {item.headline}
                  </div>
                  <div className="news-item__info-description">
                      <Markdown>{item.description}</Markdown>
                  </div>
                  <div className="news-item__info-booth">
                    {item.boothNumber}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default News;
