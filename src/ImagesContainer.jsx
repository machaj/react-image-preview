import React from 'react/react';
import prefixStyles from './prefixStyles';

const imagesContainerStyle = prefixStyles({
    position: 'relative',
    height: '100%',
    transition: 'all 0.2s'
});

class ImagesContainer extends React.Component {
    render() {
        const style = Object.assign({ transform: `translateX(-${this.props.translateX}px)` }, imagesContainerStyle);

        return (
            <div style={style}>
                {this.props.images}
            </div>
        );
    }
}

ImagesContainer.propTypes = {
    translateX: React.PropTypes.number.isRequired
};

export default ImagesContainer;
