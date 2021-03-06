import * as React from 'react';

namespace Navigator {
    export interface Props {
        initialPathQuery: PathQuery;
        router: Router;
    }
    export interface PathQuery {
        path: string;
        query?: {[key: string]: string};
    }
    export interface Params extends PathQuery {
        pathParams?: {[key: string]: string};
    }
    export interface NavigatorElement {
        push: (pathQuery: PathQuery) => void;
        pop: () => void;
    }
    export type ElementFunction = (navigator: NavigatorElement) => JSX.Element;

    export type RouteFunction = (params: Params, navigator: NavigatorElement) => JSX.Element;

    export interface Router {
        [path: string]: RouteFunction | Router;
        _notFound?: RouteFunction;
    }

    export function createElement(pathQuery: PathQuery, router: Router): ElementFunction {
        let { path, query } = pathQuery;
        path = path.startsWith('/') ? path.substr(1) : path;
        return _createElement({ path, query }, router) || (router._notFound ? router._notFound.bind(this, pathQuery) : () => null);
    }
    
    function _createElement(
        params: Params,
        router: RouteFunction | Router
    ): (navigator: NavigatorElement) => JSX.Element {
        if (!params.path) {
            return typeof router === 'function'
                ? (router as any).bind(this, params)
                : typeof router[''] === 'function'
                    ? (router[''] as any).bind(this, params)
                    : null;
        }
        const paths = params.path.split('/'),
            firstPath = paths.shift(),
            nextPath = paths.join('/');
        let result: (navigator: NavigatorElement) => JSX.Element = null;
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
