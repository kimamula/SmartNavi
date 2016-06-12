import * as React from 'react';
import { PickerProperties, PickerItemProperties } from 'react-native';

class Picker extends React.Component<PickerProperties, void> {
    render(): JSX.Element {
        return <select
            style={this.props.style}
            defaultValue={this.props.selectedValue}
            onChange={event => this.props.onValueChange && this.props.onValueChange((event.currentTarget as HTMLSelectElement).value)}
        >{this.props.children}</select>;
    }
}

namespace Picker {
    export class Item extends React.Component<PickerItemProperties, void> {
        render(): JSX.Element {
            return <option value={this.props.value}>{this.props.label}</option>;
        }
    }
}

export default Picker;
