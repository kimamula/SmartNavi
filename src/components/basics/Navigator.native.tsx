import { Navigator } from 'react-native';
import Base from './Navigator';
import * as React from 'react';

class NavigatorWrapper extends React.Component<Base.Props, void> {
    render(): JSX.Element {
        return <Navigator
            renderScene={(pathQuery: Base.PathQuery, navigator: Navigator) => (pathQuery
                ? Base.createElement(pathQuery, this.props.router)
                : this.props.initialElement
            )(navigator)}
        />;
    }
}

export default NavigatorWrapper;
