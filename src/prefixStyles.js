import prefix from 'prefix';

const prefixStyles = function prefixStyles(styles) {
    const prefixedStyles = {};

    if (typeof styles === 'object') {
        const keys = Object.keys(styles);

        keys.forEach((key) => {
            if ({}.hasOwnProperty.call(styles, key)) {
                prefixedStyles[prefix(key)] = styles[key];
            }
        });
    }

    return prefixedStyles;
};

export default prefixStyles;
