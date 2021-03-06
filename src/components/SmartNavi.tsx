import * as React from 'react';
import Navigator from './basics/Navigator';

class SmartNavi extends React.Component<Navigator.Props, void> {
    render(): JSX.Element {
        return <Navigator {...this.props} />;
    }
}

export default SmartNavi;
