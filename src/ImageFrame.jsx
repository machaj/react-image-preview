import React from 'react/react';

import getPictureDimensions from './getPictureDimensions';
import prefixStyles from './prefixStyles';

const imageFrameStyle = prefixStyles({
    position: 'absolute',
    top: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.2)',
    opacity: 0
});

const imageStyle = prefixStyles({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
});

const descriptionStyle = prefixStyles({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40px',
    paddingTop: '10px',
    paddingLeft: '10px',
    textAlign: 'center'
});

function renderImage(props, image) {
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
        this.descriptionStyle = Object.assign(descriptionStyle, {
            color: this.props.descriptionColor,
            backgroundColor: this.props.descriptionBackgroundColor
        });
    }

    componentWillReceiveProps(nextProps) {
        this.loadImage();
        this.frameStyle = updateFrameStyle(nextProps);
    }

    render() {
        const image = this.state.loaded ?
            renderImage(this.props, this.img) : (<div style={imageStyle}>{this.props.loader}</div>);

        return (
            <div style={this.frameStyle}>
                {image}
                <div style={this.descriptionStyle}>
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
    width: React.PropTypes.number.isRequired,
    loader: React.PropTypes.element.isRequired,
    descriptionColor: React.PropTypes.string.isRequired,
    descriptionBackgroundColor: React.PropTypes.string.isRequired
};

export default ImageFrame;
