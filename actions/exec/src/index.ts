import {actionTypes} from "@flump/registry";
import {command, Options} from 'execa';

export type ExecConfig = {
    command: string;
    options?: Options;
    arguments?: string[]
}

declare module '@flump/registry' {
    interface ActionTypes {
        exec: ExecConfig;
    }
}

actionTypes.set('exec', async (result, conf) => {

    await command(conf.command, conf.options);
});
