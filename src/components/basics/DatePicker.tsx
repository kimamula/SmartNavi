import { DatePickerIOSProperties } from 'react-native';
import * as React from 'react';

class DatePicker extends React.Component<DatePickerIOSProperties, void> {
    render(): JSX.Element {
        const typeSuffix = this.props.mode === 'datetime' ? '-local' : '';
        return <input
            type={this.props.mode + typeSuffix}
            value={ISODateString(this.props.date)}
            min={ISODateString(this.props.minimumDate)}
            max={ISODateString(this.props.maximumDate)}
            style={this.props.style}
            onChange={event =>
                this.props.onDateChange && this.props.onDateChange(new Date(Date.parse((event.currentTarget as HTMLInputElement).value)))
            }
        />;
    }
}

function ISODateString(d: Date): string {
    if (!d) {
        return void 0;
    }
    function pad(n: number): string | number {
        return n < 10 ? '0' + n : n;
    }
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`
}

export default DatePicker;
