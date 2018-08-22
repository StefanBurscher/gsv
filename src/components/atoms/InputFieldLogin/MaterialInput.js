import React, { Component } from 'react'
import './InputField.css';
import InputMask from 'react-input-mask';

class MaterialInput extends Component {

    inputChange(e) {
        if (e.target.value) {
            e.target.classList.add("filled");
            e.target.classList.add("error");
        }
        else {
            e.target.classList.remove("filled");
            //Mislim da ne radi remove za error ostaje crvena linija
            e.target.classList.remove("error");
        }

        this.props.handleInputChange(e.target.value);
    }


    render() {
        return (
            <div className="inputDiv">
                <div className="ui transparent input inputField">
                    <label>
                        <InputMask
                            type={this.props.type}
                            placeholder=""
                            value={this.props.value}
                            onChange={this.inputChange.bind(this)}
                            mask={null}
                            maskChar={null}
                        />
                        <span>{this.props.placeHolder}</span>
                    </label>
                </div>
            </div >
        );
    }
}

export default MaterialInput
