import * as React from 'react';
import { ViewProperties } from 'react-native';

class View extends React.Component<ViewProperties, void> {
    render(): JSX.Element {
        return <div style={this.props.style}>{this.props.children}</div>;
    }
}

export default View;
