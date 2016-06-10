import * as express from 'express';
import SmartNavi from '../SmartNavi'
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import * as React from 'react';
import Navigator from '../components/basics/Navigator';
import NotFound from '../components/NotFound';
import router from '../router';

const app = express();

app.use(express.static('public'));

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
