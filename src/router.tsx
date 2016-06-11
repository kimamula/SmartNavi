import Navigator from './components/basics/Navigator';
import Direction from './components/Direction';
import SearchForm from './components/SearchForm';
import * as React from 'react';

const router = {
    '': (params: Navigator.Params, navigator: Navigator.Push) => {
        const { from, to, when, time } = params.query || {} as any;
        return <SearchForm navigator={navigator} initialState={{
            from,
            to,
            when: when ? Number(when) : SearchForm.When.Depart,
            time: time ? new Date(Number(time)) : new Date()
        }}/>
    },
    directions: (params: Navigator.Params, navigator: Navigator.Push) => {
        const { from, to, when, time } = params.query || {} as any;
        return <Direction
            navigator={navigator}
            from={from}
            to={to}
            when={Number(when)}
            time={new Date(Number(time))}
        />;
    }
} as Navigator.Router;

export default router;
