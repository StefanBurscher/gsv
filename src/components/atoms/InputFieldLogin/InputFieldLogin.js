import React, { Component } from 'react'
import './InputFieldLogin.css';
import InputMask from 'react-input-mask';

import classNames from 'classnames';


class InputFieldLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFilled: props.initvalue?true:false,
            value: props.initvalue?props.initvalue:''
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     var newState = null;

    //     if (props.initvalue) {
    //         newState = {
    //             ...newState,
    //             value: props.initvalue, 
    //             isFilled: true
    //         }
    //     }

    //     return newState;
    // }
    
    handleChange = e => {
        this.props.changereduxdata(e);
        this.setState({
            value: e.target.value
        });

        if (e.target.value.length !== 0) {
            this.setState({
                isFilled: true
            })
        }else {
            this.setState({
                isFilled: false
            })
        }
    }

    render() {
        
        let labelClass = classNames({
            inputFieldLabel: true,
        });
        let inputClass = classNames({
            error: this.state.hasError,
            filled: this.state.isFilled
        });
        

        return (
            <div className="inputDiv">
                <div className="ui transparent input inputField">
                    <label className={labelClass}>
                    <InputMask className={inputClass} type={this.props.type} placeholder="" onChange={this.handleChange} maskChar=" " value={this.state.value} autoComplete={"nope-" + parseInt((Math.random()*100000), 0)}/>
                        <span>{this.props.text}</span>
                    </label>
                </div>
            </div >
        );
    }
}

export default InputFieldLogin
