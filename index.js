import SmartNavi from './src/components/SmartNavi'
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import NotFound from './src/components/pages/NotFound';
import router from './src/router';

const parent = document.getElementById('smart-navi');
ReactDOM.render(<SmartNavi router={Object.assign({_notFound: () => <NotFound />}, router())} initialPathQuery={JSON.parse(parent.dataset.initialPathQuery)} />, parent);
