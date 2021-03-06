import * as express from 'express';
import SmartNavi from '../components/SmartNavi'
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import * as React from 'react';
import Navigator from '../components/basics/Navigator';
import NotFound from '../components/pages/NotFound';
import Direction from '../model/Direction';
import Utils from '../Utils';
import router from '../router';
import 'isomorphic-fetch';

const app = express();

const supportedLanguages = [
    'en',
    'ar', 'kn',
    'bg', 'ko',
    'bn', 'lt',
    'ca', 'lv',
    'cs', 'ml',
    'da', 'mr',
    'de', 'nl',
    'el', 'no',
    'pl',
    'en-AU', 'pt',
    'en-GB', 'pt-BR',
    'es', 'pt-PT',
    'eu', 'ro',
    'eu', 'ru',
    'fa', 'sk',
    'fi', 'sl',
    'fil', 'sr',
    'fr', 'sv',
    'gl', 'ta',
    'gu', 'te',
    'hi', 'th',
    'hr', 'tl',
    'hu', 'tr',
    'id', 'uk',
    'it', 'vi',
    'iw', 'zh-CN',
    'ja', 'zh-TW'
];

app.use(express.static('public'));

app.get('/api/directions', (req, res) =>
    fetch(
        `https://maps.googleapis.com/maps/api/directions/json${Utils.toQueryString({
            origin: req.query.from,
            destination: req.query.to,
            mode: 'transit',
            [req.query.when === Direction.When.Arrive ? 'arrival_time' : 'departure_time']: Math.floor(req.query.time / 1000),
            language: req.acceptsLanguages(supportedLanguages) || 'en'
        })}`
    )
        .then(response => response.json()
            .then(json => res.status(response.status).json(json))
        )
);

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
        }}, router())} initialPathQuery={pathQuery} />, pathQuery);
    res.status(status).send(response);
});

function render(element: React.ReactElement<any>, pathQuery: Navigator.PathQuery): string {
    return `<!DOCTYPE html>
    ${renderToStaticMarkup(
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <title>smart-navi</title>
                <meta name='viewport' content='width=device-width, initial-scale=0.5, minimum-scale=1.0, maximum-scale=4.0' />
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
            <body style={{margin: 0}}>
                <div id="smart-navi"
                     data-initial-path-query={JSON.stringify(pathQuery || {})}
                     dangerouslySetInnerHTML={{__html: renderToString(element)}}
                ></div>
                <script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>
                <script>{`
                    // Initialize Firebase
                    var config = {
                        apiKey: "AIzaSyCs1twyuTWO8ZF2LqR63yYOJCd-22YK2cs",
                        authDomain: "smart-navi.firebaseapp.com",
                        databaseURL: "https://smart-navi.firebaseio.com",
                        storageBucket: "smart-navi.appspot.com",
                    };
                    firebase.initializeApp(config);
                `}</script>
                <script type='text/javascript' src="js/index.js"></script>
            </body>
        </html>
    )}`;
}

export = app;
