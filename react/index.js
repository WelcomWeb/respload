var React = require('react'),
    Respload = require('../src/respload');

var ResploadImage = React.createClass({
    getInitialState: function () {
        return { isVisible: false };
    },
    componentDidMount: function () {
        if (Respload.isElementVisible(this.getDOMNode())) {
            this.setState({ isVisible: true });
        }
    },
    render: function () {
        var props = this.props;

        if (!this.state.isVisible) {
            var source = this.props.src;
            
            delete props['src'];
            props['data-src'] = source;
        }

        return React.createElement('img', props, null);
    }
});

module.exports = ResploadImage;