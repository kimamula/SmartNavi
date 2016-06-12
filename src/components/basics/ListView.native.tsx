import { ListView } from 'react-native';
import * as React from 'react';
import Common from './ListView.common';

class ListViewWrapper<T> extends React.Component<Common.Props<T>, void> {
    render(): JSX.Element {
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return <ListView
            dataSource={dataSource.cloneWithRows(this.props.dataSource)}
            renderRow={(rowData, sectionID, rowID) => this.props.renderRow(rowData, Number(rowID))}
        />;
    }
}

export default ListViewWrapper;

