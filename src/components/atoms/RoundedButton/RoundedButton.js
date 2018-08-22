import React from 'react';
import { Button } from 'reactstrap';

const ButtonStyle = {
    borderRadius: '2rem',
    backgroundColor: '#1C9CF2',
    border: '2px solid #1C9CF2',
	color: 'white',
    textAlign: 'center',
    fontWeight: 200,
}

class RoundedButton extends React.Component {
    render() {
        let style = this.props.style;
        let otherProps = {...this.props};
        delete otherProps.style;
        return (
            <Button 
                style={{...ButtonStyle, ...style}} 
                {...otherProps}
            >
                {this.props.children}
            </Button>
        );
    }
}

export default RoundedButton;