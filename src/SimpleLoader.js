import React from 'react/react';

function updateIndex() {
    const newIndex = this.state.index;
    this.timerId = null;
    this.setState({ index: (newIndex < 4 ? newIndex + 1 : 0) });
}

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

        const loaderElements = [];
        for (let i = 0; i < 5; i ++) {
            const style = {
                position: 'relative',
                top: (i === this.state.index ? '-10px' : 0)
            };

            loaderElements.push(
                <span key={i} style={style}>&#9675;</span>
            );
        }

        return (
            <div>
                {loaderElements}
            </div>
        );
    }
}

export default SimpleLoader;
