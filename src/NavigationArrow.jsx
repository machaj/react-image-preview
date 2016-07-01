import React from 'react/react';

const arrowStyle = {
    position: 'absolute',
    height: '100%',
    top: '45%',
    padding: '20px',
    cursor: 'pointer'
};

const arrowLeftStyle = Object.assign({ left: 0 }, arrowStyle);
const arrowRightStyle = Object.assign({ right: 0 }, arrowStyle);

class NavigationArrow extends React.Component {
    render() {
        let arrow = null;

        if (this.props.orientation === 'left') {
            arrow = (
                <div style={arrowLeftStyle} onClick={this.props.clickAction}>
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                </div>
            );
        } else {
            arrow = (
                <div style={arrowRightStyle} onClick={this.props.clickAction}>
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                </div>
            );
        }

        return arrow;
    }
}

NavigationArrow.propTypes = {
    orientation: React.PropTypes.oneOf(['left', 'right']),
    clickAction: React.PropTypes.func.isRequired
};

export default NavigationArrow;
