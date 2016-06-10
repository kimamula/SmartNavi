import { Navigator } from 'react-native';
import Base from './Navigator';
import * as React from 'react';

class NavigatorWrapper extends React.Component<Base.Props, void> {
    render(): JSX.Element {
        return <Navigator
            renderScene={(pathQuery: Base.PathQuery, navigator: Navigator) =>
              Base.createElement(this.props.pathQuery, this.props.router)(navigator)
            }
        />;
    }
}

export default NavigatorWrapper;
