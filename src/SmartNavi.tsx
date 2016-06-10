import * as React from 'react';
import View from './components/basics/View';
import Navigator from './components/basics/Navigator';
import StyleSheet from './components/basics/StyleSheet';

class SmartNavi extends React.Component<Navigator.Props, void> {
    render(): JSX.Element {
        return <View style={styles.container}>
            SmartNavi
            <Navigator {...this.props} />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9eaed',
        flex: 1,
    }
});

export default SmartNavi;
