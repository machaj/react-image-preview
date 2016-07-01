import React from 'react/react';

import getPictureDimensions from './getPictureDimensions';

const imageFrameStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.2)',
    opacity: 0
};

const imageStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
};

const descriptionStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40px',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.5)',
    paddingTop: '10px',
    paddingLeft: '10px'
};

const spinner = (
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Spinner_font_awesome.svg/200px-Spinner_font_awesome.svg.png"
         alt="Loading image"
         style={imageStyle}
    />
);

function renderImage(props, image, isLoaded) {
    if (isLoaded) {
        const dimensions = getPictureDimensions(props.width,
            props.height,
            image.width,
            image.height
        );

        return (
            <img src={props.link}
                 alt={props.title}
                 title={props.title}
                 height={dimensions.height}
                 width={dimensions.width}
                 style={imageStyle}
            />
        );
    }
    return spinner;
}

function updateFrameStyle(props) {
    const style = Object.assign({
        minWidth: `${props.width}px`,
        left: `${props.width * props.index}px`
    }, imageFrameStyle);

    return props.visible ? Object.assign(style, { opacity: 1 }) : style;
}

class ImageFrame extends React.Component {
    constructor() {
        super();
        this.state = { loaded: false };
        this.img = new Image();
        this.img.onload = () => {
            this.setState({ loaded: true });
        };
        this.frameStyle = {};
    }

    loadImage() {
        if (this.props.load && !this.state.loaded) {
            this.img.src = this.props.link;
        }
    }

    componentWillMount() {
        this.loadImage();
        this.frameStyle = updateFrameStyle(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.loadImage();
        this.frameStyle = updateFrameStyle(nextProps);
    }

    render() {
        return (
            <div style={this.frameStyle}>
                {renderImage(this.props, this.img, this.state.loaded)}
                <div style={descriptionStyle}>
                    {this.props.title}
                </div>
            </div>
        );
    }
}

ImageFrame.propTypes = {
    height: React.PropTypes.number.isRequired,
    index: React.PropTypes.number.isRequired,
    load: React.PropTypes.bool.isRequired,
    link: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool,
    width: React.PropTypes.number.isRequired

};

export default ImageFrame;
