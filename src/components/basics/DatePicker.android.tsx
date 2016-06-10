import { DatePickerAndroid, TimePickerAndroid, DatePickerIOSProperties } from 'react-native';
import * as React from 'react';
import Text from './Text';
import View from './View';
import StyleSheet from './StyleSheet';

class DatePicker extends React.Component<DatePickerIOSProperties, void> {
    render(): JSX.Element {
        const texts: JSX.Element[] = [];
        if (this.props.mode.indexOf('date') >= 0) {
            texts.push(
                <Text onPress={this.showDatePicker.bind(this)} style={styles.label}>
                    {this.props.date.toLocaleDateString()}
                </Text>
            );
        }
        if (this.props.mode.indexOf('time') >= 0) {
            texts.push(
                <Text onPress={this.showTimePicker.bind(this)} style={styles.label}>
                    {this.props.date.toLocaleTimeString(void 0, {hour: '2-digit', minute: '2-digit'})}
                </Text>
            );
        }
        return <View style={styles.row}>{texts}</View>;
    }

    private showDatePicker(): void {
        DatePickerAndroid.open({
            date: this.props.date,
            minDate: this.props.minimumDate,
            maxDate: this.props.maximumDate
        })
            .then(({action, year, month, day}) => {
                if (!this.props.onDateChange) {
                    return;
                }
                if (action !== DatePickerAndroid.dateSetAction) {
                    return;
                }
                const newDate = new Date(this.props.date.getTime());
                newDate.setFullYear(year, month, day);
                this.props.onDateChange(newDate);
            });
    }

    private showTimePicker(): void {
        TimePickerAndroid.open({
            hour: this.props.date.getHours(),
            minute: this.props.minimumDate.getMinutes()
        })
            .then(({action, hour, minute}) => {
                if (!this.props.onDateChange) {
                    return;
                }
                if (action !== DatePickerAndroid.dateSetAction) {
                    return;
                }
                const newDate = new Date(this.props.date.getTime());
                newDate.setHours(hour, minute);
                this.props.onDateChange(newDate);
            });
    }
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    label: {
        flex: 1
    }
});

export default DatePicker;
