import * as React from 'react';
import View from './components/basics/View';
import Navigator from './components/basics/Navigator';
import StyleSheet from './components/basics/StyleSheet';
import Text from './components/basics/Text';

class SmartNavi extends React.Component<Navigator.Props, void> {
    render(): JSX.Element {
        return <View style={styles.container}>
            <Text>SmartNavi</Text>
            <Navigator {...this.props} />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#e9eaed',
        flex: 1,
    }
});

export default SmartNavi;
