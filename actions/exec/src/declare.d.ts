import {Options} from 'execa';
import '@flump/registry';

type ExecConfig = {
    command: string;
    options?: Options;
}

declare module '@flump/registry' {
    interface ActionTypes {
        exec: ExecConfig;
    }
}
