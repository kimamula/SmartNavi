import { Navigator } from 'react-native';
import Common from './Navigator.common';
import * as React from 'react';

class NavigatorWrapper extends React.Component<Common.Props, void> {
    render(): JSX.Element {
        return <Navigator
            renderScene={(pathQuery: Common.PathQuery, navigator: Navigator) =>
              Common.createElement(this.props.pathQuery, this.props.router)(navigator)
            }
        />;
    }
}

export default NavigatorWrapper;
