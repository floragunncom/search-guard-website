import React from 'react';
import './CodeBlock.scss';

const CodeBlock = props => {
    return (
        <div className="code-highlight">
            <span className="copy-code">copy</span>
            <pre>
                {props.children}
            </pre>
        </div>
    )
};

export default CodeBlock;
