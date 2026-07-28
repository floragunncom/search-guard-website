import React from 'react';
import Button from '../Button/Button';
import {NEWSLETTER_API_URL} from '../../config/apiEndpoints';

const Email = () => {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleNewsletterSubmit = async (formProps) => {
        return fetch(NEWSLETTER_API_URL, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                accept: 'application/json; charset=utf-8',
                'content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(formProps),
        });
    };

    const onNewsletterSubscribeClick = async (event) => {
        event.preventDefault();

        setIsProcessing(true);

        const formData = new FormData(event.target);
        const formValuesJson = {
            email: formData.get('email'),
            ids: formData.getAll('ids'),
        };

        handleNewsletterSubmit(formValuesJson)
            .then(() => {
                setIsProcessing(false);
                setIsSubmitted(true);
            })
            .catch(() => {
                setIsProcessing(false);
                setIsSubmitted(true);
            });
    };

    return (
        <div>

            <div
                className="prefooter-content-text  text-processing nl-thanks"
                style={{display: isSubmitted ? 'block' : 'none'}}
            >
                <h5 className="nl-feedback">Thank you for signing up to our newsletter!</h5>
            </div>

            <div
                className="prefooter-content-text text-processing nl-processing"
                style={{display: isProcessing ? 'block' : 'none'}}
            >
                <h5 className="nl-feedback">Processing</h5>
            </div>

            <form
                className="nl-newsletterform"
                onSubmit={onNewsletterSubscribeClick}
                style={{display: !isProcessing && !isSubmitted ? 'block' : 'none'}}
            >
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
