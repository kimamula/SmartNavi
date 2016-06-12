import * as React from 'react';

class Progress extends React.Component<void, void> {
    render(): JSX.Element {
        return <div style={style.container}>
            <div style={style.loading}>
                <span style={Object.assign(style.item1, style.item)} />
                <span style={Object.assign(style.item2, style.item)} />
                <span style={Object.assign(style.item3, style.item)} />
                <span style={Object.assign(style.item4, style.item)} />
                <span style={Object.assign(style.item5, style.item)} />
                <span style={Object.assign(style.item6, style.item)} />
                <span style={Object.assign(style.item7, style.item)} />
                <span style={Object.assign(style.item8, style.item)} />
            </div>
        </div>;
    }
}

const style = {
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        minHeight: 180
    },
    loading: {
        width: 48,
        height: 48,
        margin: '0 auto',
        position: 'relative',
        bottom: -60,
        zIndex: 1,
        WebkitAnimationName: 'fade, rotate',
        WebkitAnimationDuration: '.8s',
        WebkitAnimationTimingFunction: 'linear',
        WebkitAnimationIterationCount: 'infinite'
    },
    item: {
        borderRadius: 5,
        display: 'block',
        width: 10,
        height: 10,
        position: 'absolute'
    },
    item1: {
        top: 3,
        left: 19,
        background: '#333'
    },
    item2: {
        top: 7,
        left: 30
    },
    item3: {
        top: 19,
        left: 35
    },
    item4: {
        top: 30,
        left: 30
    },
    item5: {
        top: 35,
        left: 19,
        background: '#cacaca'
    },
    item6: {
        top: 30,
        left: 8,
        background: '#979797'
    },
    item7: {
        top: 19,
        left: 3,
        background: '#676767'
    },
    item8: {
        top: 7,
        left: 8,
        background: '#343434'
    },
};

export default Progress;
