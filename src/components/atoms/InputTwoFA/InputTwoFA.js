import React, { Component } from 'react';
import './InputTwoFA.css';

class InputTwoFA extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            inputValue: '',
            inputs: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
    }

    handleChange(e) {
        const currentPosition = e.target.getAttribute("position");
        e.target.value = e.target.value.replace(/[^0-9.]/g, '')
        if (e.target.value.length) {
            if (typeof this.state.inputs[currentPosition] !== "undefined")
                e.target.value = this.state.inputs[currentPosition][0] === e.target.value[0] ? e.target.value[1] : e.target.value[0];
        }
        let input = this.state.inputs;
        input[currentPosition] = e.target.value
        this.setState({ inputs: input })
        var number = e.target.value;
        if (number.length === 2) {
            e.target.value = number[1];
        }
        if (e.target.value.length) {
            if (currentPosition < 6) {
                this.refs['twoFaInput' + (parseInt(currentPosition, 10) + 1)].focus();
            }
        }
        this.setInputValue();
    }

    handleBack(e) {
        const key = e.keyCode || e.charCode;
        const currentPosition = e.target.getAttribute("position");
        if (key === 8 && currentPosition > 1) {
            if (typeof this.state.inputs[currentPosition] !== 'undefined') {
                if (this.state.inputs[currentPosition].length === 0)
                    this.refs['twoFaInput' + (parseInt(currentPosition, 10) - 1)].focus();
            } else {
                this.refs['twoFaInput' + (parseInt(currentPosition, 10) - 1)].focus();
            }
        }
    }

    setInputValue() {
        const inputValue = this.refs['twoFaInput1'].value
            + this.refs['twoFaInput2'].value
            + this.refs['twoFaInput3'].value
            + this.refs['twoFaInput4'].value
            + this.refs['twoFaInput5'].value
            + this.refs['twoFaInput6'].value
            ;
        this.setState({
            inputValue: inputValue
        });
    }
    render() {
        let errorMessage = false;
        if (this.props.errors[this.props.name] !== undefined) {
            errorMessage = this.props.errors[this.props.name].msg;
        }
        return (
            <div>
                <div className="inputTwoFaContainer" style={this.props.style}>
                    <input type="hidden" name={this.props.name} value={this.state.inputValue} />
                    <input position="1" ref="twoFaInput1" onInput={this.handleChange} onKeyDown={this.handleBack} className="inputTwoFa" type="number" maxLength="2" />
                    <div className="separatorTwoFactor"></div>
                    <input position="2" ref="twoFaInput2" onInput={this.handleChange} onKeyDown={this.handleBack} className="inputTwoFa" type="number" maxLength="2" />
                    <div className="separatorTwoFactor"></div>
                    <input position="3" ref="twoFaInput3" onInput={this.handleChange} onKeyDown={this.handleBack} className="inputTwoFa" type="number" maxLength="2" />
                    <div className="separatorTwoFactor"></div>
                    <input position="4" ref="twoFaInput4" onInput={this.handleChange} onKeyDown={this.handleBack} className="inputTwoFa" type="number" maxLength="2" />
                    <div className="separatorTwoFactor"></div>
                    <input position="5" ref="twoFaInput5" onInput={this.handleChange} onKeyDown={this.handleBack} className="inputTwoFa" type="number" maxLength="2" />
                    <div className="separatorTwoFactor"></div>
                    <input position="6" ref="twoFaInput6" onInput={this.handleChange} onKeyDown={this.handleBack} className="inputTwoFa" type="number" maxLength="2" />
                </div>
                {errorMessage ? <div className="tFaError">{errorMessage}</div> : <div className="tFaDesc">{this.props.tFaDesc}</div>}
            </div>
        );
    }
}

export default InputTwoFA;