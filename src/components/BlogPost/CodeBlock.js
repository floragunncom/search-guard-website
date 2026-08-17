import React from 'react';

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
            elem.textContent = "An error occurred";
        }
    }

    return (
        <div className="code-highlight">
            <span className="copy-code" onClick={copyCode}></span>
            <pre className="blogpostarticle-code-block">
                {props.children}
            </pre>
        </div>
    )
};

export default Blockquote;
