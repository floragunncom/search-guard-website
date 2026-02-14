import React from 'react';

const ButtonSubmit = ({style, text, additionalCss}) => {

    return (
        <button className={`button button-large button-default-container ${additionalCss}`} type="submit">
            {text}
        </button>
    );
};

export default ButtonSubmit;
