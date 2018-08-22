import React, { Component } from 'react'

export default class LoginContainer extends Component {
    render() {
        return (
            <div className="form-bg">
                {this.props.children}
            </div>
        )
    }
}
