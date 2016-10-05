import React from 'react/react';
import prefixStyles from './prefixStyles';

const arrowDefaultStyle = prefixStyles({
    position: 'absolute',
    height: '100%',
    top: '45%',
    padding: '20px',
    cursor: 'pointer'
});

class NavigationArrow extends React.Component {
    componentWillMount() {
        const arrowStyle = Object.assign({
            fontSize: this.props.fontSize,
            color: this.props.fontColor
        }, arrowDefaultStyle);

        this.arrowLeftStyle = Object.assign({ left: 0 }, arrowStyle);
        this.arrowRightStyle = Object.assign({ right: 0 }, arrowStyle);
    }

    render() {
        const style = this.props.orientation === 'left' ? this.arrowLeftStyle : this.arrowRightStyle;

        return (
            <div style={style} onClick={this.props.clickAction}>
                {this.props.children}
            </div>
        );
    }
}

NavigationArrow.propTypes = {
    orientation: React.PropTypes.oneOf(['left', 'right']),
    clickAction: React.PropTypes.func.isRequired,
    fontSize: React.PropTypes.string.isRequired,
    fontColor: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
};

export default NavigationArrow;
