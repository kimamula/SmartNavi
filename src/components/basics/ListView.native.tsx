import { ListView } from 'react-native';
import * as React from 'react';
import Common from './ListView.common';
import View from './View';
import StyleSheet from './StyleSheet';

class ListViewWrapper<T> extends React.Component<Common.Props<T>, void> {
    render(): JSX.Element {
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return <ListView
            dataSource={dataSource.cloneWithRows(this.props.dataSource)}
            renderRow={(rowData, sectionID, rowID) => <View style={styles.row}>{this.props.renderRow(rowData, Number(rowID))}</View>}
            renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => <View
                key={`${sectionID}-${rowID}`}
                style={{
                  height: adjacentRowHighlighted ? 4 : 1,
                  backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}
            />}
        />;
    }
}

const styles = StyleSheet.create({
    row: {
        marginLeft: 20
    }
});

export default ListViewWrapper;

