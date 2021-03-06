import * as React from 'react';
import DirectionsAPI from '../remotes/DirectionsAPI';
import Progress from '../basics/Progress';
import View from '../basics/View';
import Text from '../basics/Text';
import ListView from '../basics/ListView';
import StyleSheet from '../basics/StyleSheet';
import Navigator from '../basics/Navigator';

type LegListView = new () => ListView<DirectionsAPI.Leg>;
type StepListView = new () => ListView<DirectionsAPI.Step>;
const LegListView = ListView as LegListView,
    StepListView = ListView as StepListView;

class Direction extends React.Component<Direction.Props, Direction.State> {
    constructor(props: Direction.Props) {
        super(props);
        this.state = {};
    }
    render(): JSX.Element {
        let contents: JSX.Element;
        if (this.state.route) {
            const { summary, legs } = this.state.route;
            contents = <View style={styles.container}>
                <Text>{summary}</Text>
                <LegListView
                    dataSource={legs}
                    renderRow={leg => <View>
                            <Text>From: {leg.start_address}</Text>
                            {leg.departure_time ? <Text style={styles.button} onPress={() => this.onPressDepartureTime(leg.departure_time.value)}>Depart at {leg.departure_time.text} (tap to notify)</Text> : null}
                            <Text>To: {leg.end_address}</Text>
                            {leg.arrival_time ? <Text>Arrive at {leg.arrival_time.text}</Text> : null}
                            <Text>Distance: {leg.distance.text}</Text>
                            <Text>Duration: {leg.duration.text}</Text>
                            <StepListView
                                dataSource={leg.steps}
                                renderRow={step => this.renderStep(step)}
                            />
                        </View>}
                />
            </View>;
        } else {
            contents = <View>
                <Progress />
                <DirectionsAPI {...this.props} onSuccess={route => this.onFetchRoute(route)} onError={reason => alert(reason)} />
            </View>;
        }
        return <View style={styles.root}>
            <Text style={styles.title} onPress={() => this.props.navigator.pop()}>{'< Back to the form'}</Text>
            {contents}
        </View>;
    }

    private onFetchRoute(route: DirectionsAPI.Route): void {
        this.setState({route});
    }

    private renderStep(step: DirectionsAPI.Step): JSX.Element {
        return <View>
            <Text>{step.html_instructions}</Text>
            {step.departure_time ? <Text>Depart at {step.departure_time.text}</Text> : null}
            {step.arrival_time ? <Text>Arrive at {step.arrival_time.text}</Text> : null}
            <Text>Distance: {step.distance.text}</Text>
            <Text>Duration: {step.duration.text}</Text>
            {step.steps ? <StepListView
                dataSource={step.steps}
                renderRow={step => this.renderStep(step)}
            /> : null}
        </View>
    }

    private onPressDepartureTime(time: number): void {

    }
}

namespace Direction {
    export interface Props extends DirectionsAPI.Params {
        navigator: Navigator.NavigatorElement;
        serverURL: string;
    }
    export interface State {
        route?: DirectionsAPI.Route;
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#e9eaed',
        flex: 1
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    container: {
        backgroundColor: '#F5FCFF'
    },
    button: {
        fontSize: 20,
        color: '#FFFFFF',
        backgroundColor: '#60b044'
    }
});

export default Direction;
