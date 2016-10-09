import expect from 'expect'; // eslint-disable-line

import getPictureDimensions from '../src/getPictureDimensions';


describe('All image dimensions are smaller than the dimensions of the device', () => {
    it('should return picture dimensions', () => {
        const deviceWidth = 300;
        const deviceHeight = 800;
        const pictureWidth = 200;
        const pictureHeight = 200;
        const result = getPictureDimensions(deviceWidth, deviceHeight, pictureWidth, pictureHeight);

        expect(result.width).toBe(pictureWidth);
        expect(result.height).toBe(pictureHeight);
    });
});

describe('Image height is greater than the height of the device.', () => {
    describe('Image is portrait', () => {
        it('should return picture dimensions', () => {
            const deviceWidth = 300;
            const deviceHeight = 800;
            const pictureWidth = 200;
            const pictureHeight = 2000;
            const result = getPictureDimensions(deviceWidth, deviceHeight, pictureWidth, pictureHeight);

            expect(result.width).toBeLessThan(deviceWidth);
            expect(result.height).toBe(deviceHeight);
            expect(result.width).toBeLessThan(result.height);
        });
    });

    describe('Image is landscape', () => {
        it('should return picture dimensions', () => {
            const deviceWidth = 1400;
            const deviceHeight = 800;
            const pictureWidth = 1200;
            const pictureHeight = 1000;
            const result = getPictureDimensions(deviceWidth, deviceHeight, pictureWidth, pictureHeight);

            expect(result.width).toBeLessThan(deviceWidth);
            expect(result.height).toBe(deviceHeight);
            expect(result.height).toBeLessThan(result.width);
        });
    });
});

describe('Image width is greater than the width of the device.', () => {
    describe('Image is portrait', () => {
        it('should return picture dimensions', () => {
            const deviceWidth = 300;
            const deviceHeight = 800;
            const pictureWidth = 400;
            const pictureHeight = 700;
            const result = getPictureDimensions(deviceWidth, deviceHeight, pictureWidth, pictureHeight);

            expect(result.width).toBe(deviceWidth);
            expect(result.height).toBeLessThan(deviceHeight);
            expect(result.width).toBeLessThan(result.height);
        });
    });

    describe('Image is landscape', () => {
        it('should return picture dimensions', () => {
            const deviceWidth = 1400;
            const deviceHeight = 800;
            const pictureWidth = 1600;
            const pictureHeight = 700;
            const result = getPictureDimensions(deviceWidth, deviceHeight, pictureWidth, pictureHeight);

            expect(result.width).toBe(deviceWidth);
            expect(result.height).toBeLessThan(deviceHeight);
            expect(result.height).toBeLessThan(result.width);
        });
    });
});

describe('Image is larger than the device.', () => {
    describe('Image is portrait and device is portrait too', () => {
        it('should return picture dimensions', () => {
            const deviceWidth = 300;
            const deviceHeight = 800;
            const pictureWidth = 1500;
            const pictureHeight = 2200;
            const result = getPictureDimensions(deviceWidth, deviceHeight, pictureWidth, pictureHeight);

            expect(result.width).toBe(deviceWidth);
            expect(result.height).toBeLessThan(deviceHeight);
            expect(result.width).toBeLessThan(result.height);
        });
    });

    describe('Image is portrait and device is landscape', () => {
        it('should return picture dimensions', () => {
            const deviceWidth = 800;
            const deviceHeight = 300;
            const pictureWidth = 1500;
            const pictureHeight = 2200;
            const result = getPictureDimensions(deviceWidth, deviceHeight, pictureWidth, pictureHeight);

            expect(result.height).toBe(deviceHeight);
            expect(result.width).toBeLessThan(deviceWidth);
            expect(result.width).toBeLessThan(result.height);
        });
    });

    describe('Image is landscape and device is landscape too', () => {
        it('should return picture dimensions', () => {
            const deviceWidth = 800;
            const deviceHeight = 300;
            const pictureWidth = 2200;
            const pictureHeight = 1500;
            const result = getPictureDimensions(deviceWidth, deviceHeight, pictureWidth, pictureHeight);

            expect(result.height).toBe(deviceHeight);
            expect(result.width).toBeLessThan(deviceWidth);
            expect(result.height).toBeLessThan(result.width);
        });
    });

    describe('Image is landscape and device is portrait', () => {
        it('should return picture dimensions', () => {
            const deviceWidth = 300;
            const deviceHeight = 800;
            const pictureWidth = 2200;
            const pictureHeight = 1500;
            const result = getPictureDimensions(deviceWidth, deviceHeight, pictureWidth, pictureHeight);

            expect(result.width).toBe(deviceWidth);
            expect(result.height).toBeLessThan(deviceHeight);
            expect(result.height).toBeLessThan(result.width);
        });
    });
});
