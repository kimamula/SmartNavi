import * as React from 'react';
import Common from './ListView.common';

class ListView<T> extends React.Component<Common.Props<T>, void> {
    render(): JSX.Element {
        return <ul style={this.props.style}>
            <li>{this.props.dataSource.map((rowData, index) => this.props.renderRow(rowData, index))}</li>
        </ul>;
    }
}

export default ListView;
