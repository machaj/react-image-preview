import React from 'react/react';

import ImageFrame from './ImageFrame'; // eslint-disable-line
import ImagesContainer from './ImagesContainer'; // eslint-disable-line
import NavigationArrow from './NavigationArrow'; // eslint-disable-line
import SimpleLoader from './SimpleLoader'; // eslint-disable-line
import Icon from './Icon'; // eslint-disable-line

const defaultConfig = {
    leftArrowIcon: <Icon content='←'/>,
    rightArrowIcon: <Icon content='→'/>,
    closeIcon: <Icon content='&#10006;'/>,
    loader: <SimpleLoader/>,
    iconFontColor: 'white',
    iconFontSize: '3em',
    imageBackgroundColor: 'rgba(0, 0, 0, 0.9)',
    textColor: 'white',
    textBackgroundColor: 'rgba(0, 0, 0, 0.5)'
};

const defaultImageHolderStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    color: 'white',
    userSelect: 'none'
};

const closeButtonDefaultStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '20px',
    cursor: 'pointer'
};

function processGalleryImages(context, onClickAction) {
    const imageNodes = document.getElementsByClassName('image-preview');
    const imagesData = [];

    Array.from(imageNodes).forEach((imageLink, index) => {
        if (imageLink.rel === 'image-preview') {
            const imageProps = {
                index,
                link: imageLink.href,
                title: imageLink.title
            };

            imageLink.onclick = onClickAction.bind(context, imageProps); // eslint-disable-line
            imagesData.push(imageProps);
        }
    });

    return imagesData;
}

class ImagePreviewHolder extends React.Component {
    constructor() {
        super();
        this.images = null;
        this.bodyOverflow = null;
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.incrementIndex = () => {
            if (this.state.currentIndex < this.images.length - 1) {
                this.setState({ currentIndex: ++this.state.currentIndex });
            }
        };

        this.decrementIndex = () => {
            if (this.state.currentIndex > 0) {
                this.setState({ currentIndex: --this.state.currentIndex });
            }
        };

        this.close = () => {
            this.setState({ open: false });
        };

        this.keyDownHandler = (event) => {
            if (this.state.open) {
                switch (event.keyCode) {
                case 27:
                    this.close();
                    break;
                case 39:
                    this.incrementIndex();
                    break;
                case 37:
                    this.decrementIndex();
                    break;
                default:
                    break;
                }
            }
        };

        this.windowResizeHandelerTimeoutId = null;

        this.windowResizeHandeler = () => {
            if (this.windowResizeHandelerTimeoutId) {
                clearTimeout(this.windowResizeHandelerTimeoutId);
            }

            this.windowResizeHandelerTimeoutId = setTimeout(() => {
                this.setState({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, 500);
        };
    }

    imageLinkClickCallback(imageProps) {
        this.setState({ open: true, currentIndex: imageProps.index });
        return false;
    }

    componentWillMount() {
        this.config = Object.assign(defaultConfig, this.props.config);
        this.imageHolderStyle = Object.assign(defaultImageHolderStyle, {
            background: this.config.imageBackgroundColor
        });

        this.closeButtonStyle = Object.assign(closeButtonDefaultStyle, {
            fontSize: this.config.iconFontSize,
            color: this.config.iconFontColor
        });
        this.images = processGalleryImages(this, this.imageLinkClickCallback);
        window.addEventListener('resize', this.windowResizeHandeler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeHandeler);
    }

    render() {
        let holder = null;

        if (this.state.open) {
            document.addEventListener('keydown', this.keyDownHandler);
            this.bodyOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            const images = [];
            let leftArrow = null;
            let rightArrow = null;

            if (this.state.currentIndex > 0) {
                leftArrow = (
                    <NavigationArrow orientation='left' clickAction={this.decrementIndex}
                        fontSize={this.config.iconFontSize} fontColor={this.config.iconFontColor}
                    >
                        {this.config.leftArrowIcon}
                    </NavigationArrow>
                );
            }

            if (this.state.currentIndex < this.images.length - 1) {
                rightArrow = (
                    <NavigationArrow orientation='right' clickAction={this.incrementIndex}
                         fontSize={this.config.iconFontSize} fontColor={this.config.iconFontColor}
                    >
                        {this.config.rightArrowIcon}
                    </NavigationArrow>
                );
            }

            this.images.forEach((image) => {
                const visible = this.state.currentIndex === image.index;
                const load = (visible || this.state.currentIndex - 1 === image.index
                    || this.state.currentIndex + 1 === image.index);

                images.push(
                    <ImageFrame key={image.index}
                        height={this.state.height}
                        index={image.index}
                        link={image.link}
                        load={load}
                        title={image.title}
                        visible={visible}
                        width={this.state.width}
                        loader={this.config.loader}
                        descriptionColor={this.config.textColor}
                        descriptionBackgroundColor={this.config.textBackgroundColor}
                    />);
            });

            holder = (
                <div style={this.imageHolderStyle}>
                    <ImagesContainer translateX={this.state.currentIndex * window.innerWidth} images={images} />
                    <div style={this.closeButtonStyle} onClick={this.close}>
                        {this.config.closeIcon}
                    </div>
                    {leftArrow}
                    {rightArrow}
                </div>
            );
        } else {
            document.removeEventListener('keydown', this.keyDownHandler);
            document.body.style.overflow = this.bodyOverflow;
        }

        return holder;
    }
}

export default ImagePreviewHolder;
