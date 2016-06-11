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
        const { from, to, when, time } = this.state;
        return (
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
                <View style={styles.row}>
                    <Picker style={styles.label} selectedValue={SearchForm.When[when]}
                            onValueChange={when => this.setState({ from, to, when: SearchForm.When[when], time })} >
                        <Picker.Item value={SearchForm.When[SearchForm.When.Depart]} label={SearchForm.When[SearchForm.When.Depart]}/>
                        <Picker.Item value={SearchForm.When[SearchForm.When.Arrive]} label={SearchForm.When[SearchForm.When.Arrive]} />
                    </Picker>
                    <Text style={styles.label}>at</Text>
                </View>
                <View style={styles.row}>
                    <DatePicker date={time} mode='datetime'
                                onDateChange={time => this.setState({ from, to, when, time })} />
                </View>
                <Text onPress={() => this.onPressSearch()}>Search</Text>
            </View>
        );
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
        navigator: Navigator.Push;
    }

    export interface State {
        from?: string;
        to?: string;
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
