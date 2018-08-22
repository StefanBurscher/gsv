import React, { Component } from 'react';
import './CopyText.css'

class CopyText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.textToCopy || ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        let newValue = props.textToCopy ? props.textToCopy : '';
        return {
            value: newValue
        };
    }

    copyText() {
        var copyText = document.getElementsByClassName("copyText")[0];
        copyText.select();
        document.execCommand("copy");
    }

    render() {
        return (
            <label>
                <input className="copyText" spellcheck="false" name="secret" value={this.state.value} />
                <div className="copyTextDesc" onClick={this.copyText}>{this.props.desc}</div>
            </label>
        );
    }
}

export default CopyText;