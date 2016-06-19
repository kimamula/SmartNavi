import * as React from 'react';
import StyleSheet from '../basics/StyleSheet';
import Text from '../basics/Text';
import TextInput from '../basics/TextInput';
import View from '../basics/View';
import Picker from '../basics/Picker';
import DatePicker from '../basics/DatePicker';
import Navigator from '../basics/Navigator';
import Direction from '../../model/Direction';

class SearchForm extends React.Component<SearchForm.Props, SearchForm.State> {
    constructor(props: SearchForm.Props) {
        super(props);
        this.state = props.initialState;
    }
    render(): JSX.Element {
        const { from, to, when, time } = this.state;
        return <View style={styles.root}>
            <Text style={styles.title}>Search Form</Text>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>From</Text>
                    <TextInput style={styles.input} defaultValue={from}
                               onChangeText={from => this.setState({ from, to, when, time })} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>To</Text>
                    <TextInput style={styles.input} defaultValue={to}
                               onChangeText={to => this.setState({ from, to, when, time })} />
                </View>
                <View style={styles.datePickerRow}>
                    <Picker style={styles.picker} selectedValue={Direction.When[when]}
                            onValueChange={when => this.setState({ from, to, when: Direction.When[when], time })} >
                        <Picker.Item value={Direction.When[Direction.When.Depart]} label={Direction.When[Direction.When.Depart]}/>
                        <Picker.Item value={Direction.When[Direction.When.Arrive]} label={Direction.When[Direction.When.Arrive]} />
                    </Picker>
                    <DatePicker date={time} mode='datetime' style={styles.datePicker}
                                onDateChange={time => this.setState({ from, to, when, time })} />
                </View>
                <View style={styles.buttonRow}>
                    <Text style={styles.button} onPress={() => this.onPressSearch()}>Search</Text>
                </View>
            </View>
        </View>;
    }

    private onPressSearch(): void {
        if (!this.state.from || !this.state.to) {
            return alert('Please fill the form');
        }
        this.props.navigator.push({
            path: 'directions',
            query: {
                from: this.state.from,
                to: this.state.to,
                when: String(this.state.when),
                time: String(this.state.time.getTime())
            }
        });
    }
}

namespace SearchForm {
    export interface Props {
        initialState: State;
        navigator: Navigator.NavigatorElement;
    }

    export interface State {
        from?: string;
        to?: string;
        when: Direction.When;
        time: Date;
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
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5FCFF'
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    datePickerRow: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonRow: {
        display: 'flex',
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    label: {
        flex: 1,
        fontSize: 20
    },
    input: {
        flex: 4,
        backgroundColor: '#FFFFFF'
    },
    picker: {
        fontSize: 20,
        flex: 1
    },
    datePicker: {
        flex: 4
    },
    button: {
        fontSize: 20,
        color: '#FFFFFF',
        backgroundColor: '#60b044'
    }
});

export default SearchForm;
