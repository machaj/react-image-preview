import React from 'react/react';

import ImageFrame from './ImageFrame'; // eslint-disable-line
import ImagesContainer from './ImagesContainer'; // eslint-disable-line
import NavigationArrow from './NavigationArrow'; // eslint-disable-line

const ripHolderStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(0, 0, 0, 0.9)',
    color: 'white',
    userSelect: 'none'
};

const ripHolderCloseButtonStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '20px',
    cursor: 'pointer',
    fontSize: '2em'
};

function processGalleryImages(context, onClickAction) {
    const imageNodes = document.getElementsByClassName('rip');
    const imagesData = [];

    Array.from(imageNodes).forEach((imageLink, index) => {
        if (imageLink.rel === 'rip') {
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
                    <NavigationArrow orientation='left' clickAction={this.decrementIndex} />
                );
            }

            if (this.state.currentIndex < this.images.length - 1) {
                rightArrow = (
                    <NavigationArrow orientation='right' clickAction={this.incrementIndex} />
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
                    />);
            });

            holder = (
                <div style={ripHolderStyle}>
                    <ImagesContainer translateX={this.state.currentIndex * window.innerWidth} images={images} />
                    <div style={ripHolderCloseButtonStyle} onClick={this.close}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
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
