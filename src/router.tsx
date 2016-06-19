import Navigator from './components/basics/Navigator';
import Direction from './components/pages/Direction';
import SearchForm from './components/pages/SearchForm';
import DirectionModel from './model/Direction';
import * as React from 'react';

function router(serverURL = 'http://localhost:8000'): Navigator.Router {
    return {
        '': (params: Navigator.Params, navigator: Navigator.NavigatorElement) => {
            const { from, to, when, time } = params.query || {} as any;
            return <SearchForm navigator={navigator} initialState={{
            from,
            to,
            when: when ? Number(when) : DirectionModel.When.Depart,
            time: time ? new Date(Number(time)) : new Date()
        }}/>
        },
        directions: (params: Navigator.Params, navigator: Navigator.NavigatorElement) => {
            const { from, to, when, time } = params.query || {} as any;
            return <Direction
                from={from}
                to={to}
                when={Number(when)}
                time={new Date(Number(time))}
                navigator={navigator}
                serverURL={serverURL}
            />;
        }
    };
}

export default router;
