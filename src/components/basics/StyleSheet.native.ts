import { StyleSheet } from 'react-native';

namespace StyleSheetWrapper {
    export function create<T>(style: T): T {
        removeDisplay(style);
        return StyleSheet.create(style);
    }

    function removeDisplay(style: any): void {
        let remove = false;
        Object.keys(style).forEach(key => {
            if (typeof style[key] === 'object') {
                removeDisplay(style[key]);
            } else if (key === 'display') {
                remove = true;
            }
        });
        if (remove) {
            delete style.display;
        }
    }
}

export default StyleSheetWrapper;
