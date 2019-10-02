import React from 'react';
import claudia from '../../images/claudia.svg';
import jochen from '../../images/jochen.svg';
import hendrik from '../../images/hendrik.svg';
import mechthild from '../../images/mechthild.svg';
import iconIn from '../../images/icon-in-loud.svg';
import './Team.scss';

const Team = () => {
  const team = [
    {
      name: 'Claudia Kressin',
      position: 'Founder & CEO',
      pic: claudia,
      link: 'https://www.linkedin.com/in/searchguard/',
    },
    {
      name: 'Jochen Kressin',
      position: 'Founder & CEO',
      pic: jochen,
      link: 'https://www.linkedin.com/in/jkressin/',
    },
    {
      name: 'Hendrik Saly',
      position: 'CTO',
      pic: hendrik,
      link: 'https://www.linkedin.com/in/salyh/',
    },
    { name: 'Mechthild Wetekam', position: 'COO', pic: mechthild, link: '' },
  ];

  return (
    <div className="company-team-wrapper" id="team">
      <div className="row">
        <div className="company-team-headline">Management team</div>
        {team.map(person => {
          return (
            <div className="col s6 m3 company-team-profile">
              <img src={person.pic} alt="person" className="profile-pic" />
              <div className="profile-name">{person.name}</div>
              <div className="profile-position">{person.position}</div>
              <div className="profile-link">
                <a href={person.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={iconIn}
                    alt="linkedIn icon"
                    className="profile-linkedIn"
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
