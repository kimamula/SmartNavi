import { AppRegistry } from 'react-native'
import * as React from 'react';
import SmartNavi from './src/SmartNavi'
import router from './src/router';

class SmartNaviNative extends React.Component {
    render() {
        return <SmartNavi router={router()} initialPathQuery={{ path: '' }} />;
    }
}
console.ignoredYellowBox = ['Warning: Failed propType'];
AppRegistry.registerComponent('SmartNavi', () => SmartNaviNative);
