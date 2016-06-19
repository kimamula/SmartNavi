import { AppRegistry } from 'react-native'
import * as React from 'react';
import SmartNavi from './src/components/SmartNavi'
import router from './src/router';

class SmartNaviNative extends React.Component {
    render() {
        return <SmartNavi router={router('http://10.0.2.2:8000')} initialPathQuery={{ path: '' }} />;
    }
}
console.ignoredYellowBox = ['Warning: Failed propType', 'Warning: Each child'];
AppRegistry.registerComponent('SmartNavi', () => SmartNaviNative);
