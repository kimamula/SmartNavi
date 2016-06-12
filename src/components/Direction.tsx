import * as React from 'react';
import DirectionsAPI from './DirectionsAPI';
import Progress from './basics/Progress';
import View from './basics/View';

class Direction extends React.Component<Direction.Props, Direction.State> {
    constructor(props: Direction.Props) {
        super(props);
        this.state = {};
    }
    render(): JSX.Element {
        if (this.state.route) {
            return null;

        } else {
            return <View>
                <Progress />
                <DirectionsAPI {...this.props} onSuccess={route => this.onFetchRoute(route)} onError={reason => alert(reason)} />
            </View>;
        }
    }

    private onFetchRoute(route: DirectionsAPI.Route): void {
        this.setState({route});
    }
}

namespace Direction {
    export interface Props extends DirectionsAPI.Params {
    }
    export interface State {
        route?: DirectionsAPI.Route;
    }
}

export default Direction;
