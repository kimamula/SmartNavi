import * as React from 'react';
import { TextProperties } from 'react-native';

class Text extends React.Component<TextProperties, void> {
    render(): JSX.Element {
        return <span style={this.props.style}
                  onClick={() => this.props.onPress && this.props.onPress()}
        >{this.props.children}</span>;
    }
}

export default Text;
