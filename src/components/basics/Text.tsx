import * as React from 'react';
import { TextProperties } from 'react-native';

class Text extends React.Component<TextProperties, void> {
    render(): JSX.Element {
        return <p style={this.props.style}
                  onClick={() => this.props.onPress && this.props.onPress()}
        >{this.props.children}</p>;
    }
}

export default Text;
