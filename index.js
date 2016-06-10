import SmartNavi from './src/SmartNavi'
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import NotFound from './src/components/NotFound';
import router from './src/router';

const parent = document.getElementById('smart-navi');
ReactDOM.render(<SmartNavi router={Object.assign({_notFound: () => <NotFound />}, router)} pathQuery={JSON.parse(parent.dataset.pathQuery)} />, parent);
