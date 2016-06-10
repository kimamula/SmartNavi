import * as React from 'react';

class Navigator extends React.Component<Navigator.Props, Navigator.State> implements Navigator.Push {
    constructor(props: Navigator.Props) {
        super(props);
        this.state = {currentComponent: this.createElement(this.props.initialElement)};
        if (typeof window === 'undefined') {
            return;
        }
        window.onpopstate = event => {
            this.setState({currentComponent: this.createElement(event.state
                ? Navigator.createElement(event.state, this.props.router)
                : this.props.initialElement
            )});
        };
    }
    push(pathQuery: Navigator.PathQuery): void {
        history.pushState(pathQuery, '', pathQuery.path + toQueryString(pathQuery.query));
        this.setState({currentComponent: this.createElement(Navigator.createElement(pathQuery, this.props.router))});
    }
    render(): JSX.Element {
        return this.state.currentComponent;
    }
    private createElement(elementFunction: Navigator.ElementFunction): JSX.Element {
        return elementFunction ? elementFunction(this) : null;
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
    export interface Props {
        router: Router;
        initialElement: ElementFunction;
    }
    export interface State {
        currentComponent: JSX.Element;
    }
    export interface PathQuery {
        path: string;
        query?: {[key: string]: string};
    }
    export interface Params extends PathQuery {
        pathParams?: {[key: string]: string};
    }
    export interface Push {
        push: (pathQuery: PathQuery) => void;
    }
    export type ElementFunction = (navigator: Push) => JSX.Element;

    export type RouteFunction = ((params: Params, navigator: Push) => JSX.Element);

    export type Router = {[path: string]: RouteFunction | Router};

    export function createElement(pathQuery: PathQuery, router: Router): ElementFunction {
        return _createElement(pathQuery, router);
    }
    
    function _createElement(
        params: Params,
        router: RouteFunction | Router
    ): (navigator: Push) => JSX.Element {
        if (!params.path || params.path === '/') {
            return typeof router === 'function'
                ? (router as any).bind(this, params)
                : typeof router[''] === 'function'
                    ? (router[''] as any).bind(this, params)
                    : null;
        }
        const paths = params.path.split('/'),
            firstPath = paths.shift(),
            nextPath = paths.join('/');
        let result: (navigator: Push) => JSX.Element = null;
        if (router[firstPath]) {
            result = _createElement(
                Object.assign({}, params, {path: nextPath}),
                router[firstPath]
            );
            if (result !== null) {
                return result;
            }
        }
        Object.keys(router).some((path) => {
            if (path.startsWith(':')) {
                result = _createElement(
                    {
                        path: nextPath,
                        query: params.query,
                        pathParams: Object.assign(
                            {},
                            params.pathParams,
                            {[path.substr(1)]: firstPath}
                        )
                    },
                    router[path]
                )
            }
            return result !== null;
        });
        return result;
    }
}

export default Navigator;
