import { ViewStyle } from 'react-native';

namespace ListView {
    export interface Props<T> {
        dataSource: T[];
        renderRow(rowDate: T, index: number): JSX.Element
        style?: ViewStyle;
    }
}

export default ListView;
