import { DatePickerIOSProperties } from 'react-native';
import * as React from 'react';

class DatePicker extends React.Component<DatePickerIOSProperties, void> {
    render(): JSX.Element {
        const typeSuffix = this.props.mode === 'datetime' ? '-local' : '';
        return <input
            type={this.props.mode + typeSuffix}
            value={toInputDateString(this.props.date)}
            min={toInputDateString(this.props.minimumDate)}
            max={toInputDateString(this.props.maximumDate)}
            style={this.props.style}
            onChange={event =>
                this.props.onDateChange && this.props.onDateChange(new Date(Date.parse((event.currentTarget as HTMLInputElement).value)))
            }
        />;
    }
}

function toInputDateString(d: Date): string {
    if (!d) {
        return void 0;
    }
    function pad(n: number): string | number {
        return n < 10 ? '0' + n : n;
    }
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export default DatePicker;
