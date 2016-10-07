function getMinorDimenson(imageRatio, mainDimension) {
    return imageRatio > 1 ? mainDimension / imageRatio : mainDimension * imageRatio;
}


const getPictureDimensions = function getPictureDimensions(deviceWidth, deviceHeight, pictureWidth, pictureHeight) {
    const imageRatio = pictureWidth / pictureHeight;

    if (deviceWidth > pictureWidth && deviceHeight > pictureHeight) {
        return {
            width: pictureWidth,
            height: pictureHeight
        };
    } else if (deviceWidth > pictureWidth && deviceHeight < pictureHeight) {
        return {
            width: deviceHeight * imageRatio,
            height: deviceHeight
        };
    } else if (deviceWidth < pictureWidth && deviceHeight > pictureHeight) {
        return {
            width: deviceWidth,
            height: deviceWidth / imageRatio
        };
    }

    const heightRatio = pictureHeight / deviceHeight;
    const widthRatio = pictureWidth / deviceWidth;

    if (widthRatio > heightRatio) {
        return {
            width: deviceWidth,
            height: deviceWidth / imageRatio
        };
    }
    return {
        width: deviceHeight * imageRatio,
        height: deviceHeight
    };
};

export default getPictureDimensions;
