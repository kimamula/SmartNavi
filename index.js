import SmartNavi from './src/SmartNavi'
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import NotFound from './src/components/NotFound';
import router from './src/router';
import Navigator from './src/components/basics/Navigator';

const parent = document.getElementById('smart-navi');
const element = Navigator.createElement(JSON.parse(parent.dataset.pathQuery), router);
ReactDOM.render(<SmartNavi router={router} initialElement={element ? element : () => <NotFound />} />, parent);
