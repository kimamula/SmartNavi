import * as React from 'react';
import SearchForm from './SearchForm';
import Navigator from './basics/Navigator';
import Text from './basics/Text';

class Direction extends React.Component<Direction.Props, void> {
    render(): JSX.Element {
        return <Text>hogehoge</Text>;
    }
}

namespace Direction {
    export interface Props {
        origin: string;
        destination: string;
        when: SearchForm.When;
        time: Date;
        navigator: Navigator.Push;
    }
}

export default Direction;
