import React from 'react';
import './CodeBlock.scss';
import M from "materialize-css";

const Blockquote = props => {

    async function copyCode(event) {
        event.preventDefault();
        let codeElem = event.target.nextSibling.firstChild;
        writeClipboardText(codeElem.textContent, event.target)
    }

    async function writeClipboardText(text, elem) {
        try {
            await navigator.clipboard.writeText(text);
            // visual feedback
            elem.textContent = "copied"
            setTimeout(function() {elem.textContent = "copy"}, 1000);
        }
        catch (error) {
            elem.textContent = "An error occured";
        }
    }

    return (
        <div className="code-highlight">
            <span className="copy-code" onClick={copyCode}>copy</span>
            <pre>
                {props.children}
            </pre>
        </div>
    )
};

export default Blockquote;
