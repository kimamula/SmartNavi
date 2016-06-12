import * as express from 'express';
import SmartNavi from '../SmartNavi'
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import * as React from 'react';
import Navigator from '../components/basics/Navigator';
import NotFound from '../components/NotFound';
import router from '../router';
import 'isomorphic-fetch';

const app = express();

app.use(express.static('public'));

app.get('/api/directions', (req, res) =>
    fetch(
        `https://maps.googleapis.com/maps/api/directions/json${toQueryString({
            origin: req.query.from,
            destination: req.query.to,
            key: process.env.DIRECTIONS_API_KEY,
            mode: 'transit',
            [req.query.when === 'Arrive' ? 'arrival_time' : 'departure_time']: Math.floor(req.query.time / 1000)
        })}`,
        {
            method: 'GET'
        }
    )
        .then(response => response.json()
            .then(json => res.status(response.status).json(json))
        )
);

function toQueryString(query?: {[key: string]: string}): string {
    if (!query) {
        return '';
    }
    return Object.keys(query).reduce((acc, key, index) => {
        const sep = index ? '&' : '?';
        return `${acc}${sep}${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    }, '')
}

app.use((req, res) => {
    let status = 200;
    const
        pathQuery = {
            path: req.path,
            query: Object.assign({time: String(Date.now())}, req.query)
        },
        response = render(<SmartNavi router={Object.assign({_notFound: () => {
            status = 404;
            return <NotFound />;
        }}, router)} pathQuery={pathQuery} />, pathQuery);
    res.status(status).send(response);
});

function render(element: React.ReactElement<any>, pathQuery: Navigator.PathQuery): string {
    return `<!DOCTYPE html>
    ${renderToStaticMarkup(
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <title>smart-navi</title>
                <style type="text/css">{`
                    @-webkit-keyframes rotate {
                        0% {
                            -webkit-transform: rotate(0);
                        }
                        100% {
                            -webkit-transform: rotate(360deg);
                        }
                    }
                    @-webkit-keyframes fade {
                        0% {
                            opacity: 1;
                        }
                        50% {
                            opacity: .2;
                        }
                        100% {
                          opacity: 1;
                        }
                    }
                `}</style>
            </head>
            <body>
                <div id="smart-navi"
                     data-path-query={JSON.stringify(pathQuery || {})}
                     dangerouslySetInnerHTML={{__html: renderToString(element)}}
                ></div>
                <script type='text/javascript' src="js/index.js"></script>
            </body>
        </html>
    )}`;
}

export = app;
