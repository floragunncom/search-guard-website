import React from 'react';
import claudia from '../../images/claudia.svg';
import jochen from '../../images/jochen.svg';
import hendrik from '../../images/hendrik.svg';
import mechthild from '../../images/mechthild.svg';
import anja from '../../images/anja.svg';
import iconIn from '../../images/icon-in-loud.svg';

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
      position: 'Co-Founder',
      pic: hendrik,
      link: 'https://www.linkedin.com/in/salyh/',
    },
    { name: 'Mechthild Wetekam',
      position: 'COO',
      pic: mechthild,
      link: ''
    },
    { name: 'Anja Glauch',
      position: 'CMO',
      pic: anja,
      link: 'https://www.linkedin.com/in/anjaglauch/'
    }
  ];

  return (
    <div className="company-team-wrapper" id="team">
      <h3 className="company-team-headline">Management team</h3>
      <div className="row">
        {team.map(person => {
          return (
            <div className="col s12 l6 company-team-profile" key={person.link}>
              <img loading="lazy" src={person.pic} alt="person" className="profile-pic" width="300px" height="300px" />
              <h5 className="profile-name">{person.name}</h5>
              <div className="body1 profile-position">{person.position}</div>
              <div className="profile-link">
                <a href={person.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={iconIn}
                    alt="linkedIn icon"
                    className="profile-linkedIn"
                    width="32px" height="32px"
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
