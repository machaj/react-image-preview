import React from 'react';
import ReactDOM from 'react-dom';
import ImagePreviewHolder from '../lib/ImagePreviewHolder';

var Example = React.createClass({
    render: function() {
        return (
            <ImagePreviewHolder />
        );
    }
});

ReactDOM.render(<Example />, document.getElementById("container"));