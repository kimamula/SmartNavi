import Navigator from './components/basics/Navigator';
import Direction from './components/Direction';
import SearchForm from './components/SearchForm';
import * as React from 'react';

const router = {
    '': (params: Navigator.Params, navigator: Navigator.Push) => {
        const { origin, destination, when, time } = params.query;
        return <SearchForm navigator={navigator} initialState={{
            origin,
                destination,
                when: when ? Number(when) : SearchForm.When.Depart,
                time: time ? new Date(Number(time)) : new Date()
        }}/>
    },
    directions: (params: Navigator.Params, navigator: Navigator.Push) => {
        const { origin, destination, when, time } = params.query;
        return <Direction
            navigator={navigator}
        origin={origin}
        destination={destination}
        when={Number(when)}
        time={new Date(Number(time))}
            />;
    }
} as Navigator.Router;

export default router;
