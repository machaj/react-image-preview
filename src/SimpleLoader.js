import React from 'react/react';

function updateIndex() {
    const newIndex = this.state.index;
    this.timerId = null;
    this.setState({ index: (newIndex < 4 ? newIndex + 1 : 0) });
}

const frames = [
    '▹ ▹ ▹ ▹ ▹',
    '▸ ▹ ▹ ▹ ▹',
    '▹ ▸ ▹ ▹ ▹',
    '▹ ▹ ▸ ▹ ▹',
    '▹ ▹ ▹ ▸ ▹',
    '▹ ▹ ▹ ▹ ▸'
];

const loaderStyle = {
    fontSize: '2em'
};

class SimpleLoader extends React.Component {
    constructor() {
        super();
        this.state = { index: 0 };
        this.updateIndex = updateIndex.bind(this);
        this.timerId = null;
    }

    componentWillUnmount() {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
    }

    render() {
        this.timerId = setTimeout(this.updateIndex, 700);

        return (
            <div style={loaderStyle}>{frames[this.state.index]}</div>
        );
    }
}

export default SimpleLoader;
