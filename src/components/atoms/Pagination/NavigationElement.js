import React, { Component } from 'react';

class NavigationElement extends Component {

    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        e.preventDefault();
        this.props.changePage(this.props.page);

    }

    render() {
        return (
            <a className={this.props.className} onClick={this.handleClick}>{this.props.label}</a>
        );
    }
}

export default NavigationElement;