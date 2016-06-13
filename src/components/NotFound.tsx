import * as React from 'react';
import Text from './basics/Text';
import View from './basics/View';
import StyleSheet from './basics/StyleSheet';

class NotFound extends React.Component<void, void> {
    render(): JSX.Element {
        return <View style={styles.root}>
            <Text style={styles.title}>NotFound</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#e9eaed',
        flex: 1
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    }
});

export default NotFound;
