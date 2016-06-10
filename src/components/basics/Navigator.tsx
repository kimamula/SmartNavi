import * as React from 'react';
import Common from './Navigator.common';

class Navigator extends React.Component<Navigator.Props, Navigator.State> implements Navigator.Push {
    constructor(props: Navigator.Props) {
        super(props);
        this.state = {currentComponent: Navigator.createElement(props.pathQuery, props.router)(this)};
        if (typeof window === 'undefined') {
            return;
        }
        window.onpopstate = event =>
            this.setState({currentComponent: Navigator.createElement(event.state || props.pathQuery, props.router)(this)})
        ;
    }
    push(pathQuery: Navigator.PathQuery): void {
        history.pushState(pathQuery, '', pathQuery.path + toQueryString(pathQuery.query));
        this.setState({currentComponent: Navigator.createElement(pathQuery, this.props.router)(this)});
    }
    render(): JSX.Element {
        return this.state.currentComponent;
    }
}

function toQueryString(query?: {[key: string]: string}): string {
    if (!query) {
        return '';
    }
    return Object.keys(query).reduce((acc, key, index) => {
        const sep = index ? '&' : '?';
        return `${acc}${sep}${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    }, '')
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
