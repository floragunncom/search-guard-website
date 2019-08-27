import React from 'react';
import Button from '../../components/Button/Button';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <div className="row">
        <div className="col s12 m10 offset-m1 l8 offset-l2">
          <div className="notfound-warning">404</div>
          <div className="notfound-headline">Something is wrong!</div>
          <div className="notfound-text">
            The page you are looking for was moved, removed, renamed or might
            have never existed.
          </div>
          <div className="notfound-button">
            <Button text="go home" link="/" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
