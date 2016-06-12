import * as React from 'react';
import SearchForm from './SearchForm';
import Navigator from './basics/Navigator';
import Progress from './basics/Progress';

class Direction extends React.Component<Direction.Props, void> {
    render(): JSX.Element {
        return <Progress />;
    }
}

namespace Direction {
    export interface Props {
        from: string;
        to: string;
        when: SearchForm.When;
        time: Date;
        navigator: Navigator.Push;
    }
}

export default Direction;
