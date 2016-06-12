import * as React from 'react';
import { ProgressViewIOS } from 'react-native';

class Progress extends React.Component<void, Progress.State> {
    constructor() {
        super();
        this.state = { progress: 0 };
    }
    componentDidMount(): void {
        this.updateProgress();
    }
    render(): JSX.Element {
        return <ProgressViewIOS progress={this.getProgress()} />;
    }

    private updateProgress(): void {
        setInterval(() => {
            this.setState({ progress: this.state.progress + 0.01 })
        }, 50);
    }

    private getProgress(): number {
        return Math.sin(this.state.progress % Math.PI) % 1;
    }
}

namespace Progress {
    export interface State {
        progress: number;
    }
}

export default Progress;
