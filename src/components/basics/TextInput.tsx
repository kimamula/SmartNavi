import * as React from 'react';
import { TextInputProperties } from 'react-native';

class TextInput extends React.Component<TextInputProperties, void> {
    render(): JSX.Element {
        const nullFunc = (arg?: any) => {},
            { style, value, defaultValue, onChangeText = nullFunc, onFocus = nullFunc, onBlur = nullFunc } = this.props;
        return <input type="text"
                      style={style}
                      value={value}
                      defaultValue={defaultValue}
                      onChange={event => onChangeText((event.currentTarget as HTMLInputElement).value)}
                      onFocus={() => onFocus()}
                      onBlur={() => onBlur()}
        />;
    }
}

export default TextInput;
