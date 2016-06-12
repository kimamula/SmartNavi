import * as React from 'react';
import Common from './Navigator.common';
import Utils from '../../Utils';

class Navigator extends React.Component<Navigator.Props, Navigator.State> implements Navigator.Push {
    constructor(props: Navigator.Props) {
        super(props);
        this.state = {currentComponent: Navigator.createElement(props.initialPathQuery, props.router)(this)};
        if (typeof window === 'undefined') {
            return;
        }
        window.onpopstate = event =>
            this.setState({currentComponent: Navigator.createElement(event.state || props.initialPathQuery, props.router)(this)})
        ;
    }
    push(pathQuery: Navigator.PathQuery): void {
        history.pushState(pathQuery, '', pathQuery.path + Utils.toQueryString(pathQuery.query));
        this.setState({currentComponent: Navigator.createElement(pathQuery, this.props.router)(this)});
    }
    render(): JSX.Element {
        return this.state.currentComponent;
    }
}

namespace Navigator {
    export type Props = Common.Props;
    export interface State {
        currentComponent: JSX.Element;
    }
    export type PathQuery = Common.PathQuery;
    export type Params = Common.Params;
    export type Push = Common.Push;
    export type Router = Common.Router;

    export const createElement = Common.createElement;
}

export default Navigator;
