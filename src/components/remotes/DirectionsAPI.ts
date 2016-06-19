import * as React from 'react';
import Direction from '../../model/Direction';
import Utils from '../../Utils';

class DirectionsAPI extends React.Component<DirectionsAPI.Props, void> {
    render(): JSX.Element {
        const { from, to, when, time } = this.props;
        fetch(`${this.props.serverURL}/api/directions${Utils.toQueryString({
            from,
            to,
            when,
            time: time.getTime()
        })}`)
            .then(response => response.ok ? response.json() : Promise.reject(response.status))
            .then(json => json.status === 'OK' ? this.props.onSuccess(json.routes[0]) : Promise.reject(json.status))
            .catch(reason => this.props.onError(reason));
        return null;
    }
}

namespace DirectionsAPI {
    export interface Params {
        from: string;
        to: string;
        when: Direction.When;
        time: Date;
    }
    export interface Props extends Params {
        onSuccess(route: Route): void;
        onError(reason: any): void;
        serverURL: string;
    }
    export interface Route {
        summary: string;
        legs: Leg[];
    }
    export interface Leg {
        arrival_time?: Time;
        departure_time?: Time;
        distance: Value;
        duration: Value;
        start_address: string;
        start_location: Location;
        end_address: string;
        end_location: Location;
        steps: Step[];
    }
    export interface Step {
        arrival_time?: Time;
        departure_time?: Time;
        distance: Value;
        duration: Value;
        start_location: Location;
        end_location: Location;
        html_instructions: string;
        travel_mode: 'WALKING' | 'TRANSIT' | 'DRIVING' | 'BYCICLING';
        steps?: Step[];
    }
    export interface Value {
        text: string;
        value: number;
    }
    export interface Time extends Value {
        time_zone: string;
    }
    export interface Location {
        lat: number;
        lng: number;
    }
}

export default DirectionsAPI;
