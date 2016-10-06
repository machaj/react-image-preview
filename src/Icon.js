import React from 'react/react';

const IconStyle = {
    borderRadius: '55px',
    width: '55px',
    height: '55px',
    textAlign: 'center'
};

class Icon extends React.Component {
    render() {
        return (
            <div style={IconStyle}>{this.props.content}</div>
        );
    }
}

Icon.propTypes = {
    content: React.PropTypes.string
};

export default Icon;

