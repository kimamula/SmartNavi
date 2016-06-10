import * as React from 'react';
import StyleSheet from './basics/StyleSheet';
import Text from './basics/Text';
import TextInput from './basics/TextInput';
import View from './basics/View';
import Picker from './basics/Picker';
import DatePicker from './basics/DatePicker';
import Navigator from './basics/Navigator';

class SearchForm extends React.Component<SearchForm.Props, SearchForm.State> {
    constructor(props: SearchForm.Props) {
        super(props);
        this.state = props.initialState;
    }
    render(): JSX.Element {
        const { origin, destination, when, time } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>Origin</Text>
                    <TextInput style={styles.input} defaultValue={origin}
                               onChangeText={origin => this.setState({ origin, destination, when, time })} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Destination</Text>
                    <TextInput style={styles.input} defaultValue={destination}
                               onChangeText={destination => this.setState({ origin, destination, when, time })} />
                </View>
                <View style={styles.row}>
                    <Picker style={styles.label} selectedValue={SearchForm.When[when]}
                            onValueChange={when => this.setState({ origin, destination, when: SearchForm.When[when], time })} >
                        <Picker.Item value={SearchForm.When[SearchForm.When.Depart]} />
                        <Picker.Item value={SearchForm.When[SearchForm.When.Arrive]} />
                    </Picker>
                    <Text style={styles.label}>at</Text>
                    <DatePicker date={time} mode='datetime'
                                onDateChange={time => this.setState({ origin, destination, when, time })} />
                </View>
                <Text onPress={() => this.onPressSearch()}>Search</Text>
            </View>
        );
    }

    private onPressSearch(): void {
        if (!this.state.origin || !this.state.destination) {
            return alert('Please fill the form');
        }
        this.props.navigator.push({
            path: 'directions',
            query: {
                origin: this.state.origin,
                destination: this.state.destination,
                when: String(this.state.when),
                time: String(this.state.time.getTime())
            }
        });
    }
}

namespace SearchForm {
    export interface Props {
        initialState: State;
        navigator: Navigator.Push;
    }

    export interface State {
        origin?: string;
        destination?: string;
        when: When;
        time: Date;
    }

    export enum When {
        Depart,
        Arrive
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        fontSize: 20
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    label: {
        flex: 1,
        fontSize: 20
    },
    input: {
        flex: 2
    }
});

export default SearchForm;
