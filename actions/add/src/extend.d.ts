import {ExecConfig} from "./index";

declare module '@flump/registry' {
    interface Actions {
        exec: ExecConfig;
    }
}