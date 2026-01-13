import React from 'react';
import './Email.scss';
import Button from '../Button/Button.jsx';

const Email = () => {

    return (
        <div>

            <div className="prefooter-content-text  text-processing nl-thanks">
                <h5 className="nl-feedback">Thank you for signing up to our newsletter!</h5>
            </div>

            <div className="prefooter-content-text text-processing nl-processing">
                <h5 className="nl-feedback">Processing</h5>
            </div>

            {/* Event listeners are attached in main.js */}
            <form className="nl-newsletterform">
                <div className="input-field col s12 m6 l8">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="validate input-field"
                        required
                    />
                    <label htmlFor="email" id="email-input">
                        Email address
                    </label>
                    <span
                        className="helper-text"
                        data-error="Please type in the correct format!"
                    />
                    <input
                        name="ids"
                        type="hidden"
                        value="9254dc87-0c97-43a8-bf7b-85a624da753e"
                    />
                </div>
                <div className="input-field col s12 m6 l4">
                    <Button text="subscribe" variant="submit"/>
                </div>
            </form>
        </div>
    );
};


export default Email;
