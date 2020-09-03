import {SelectPrompt} from "./index";

declare module '@flump/registry' {
    interface Prompts {
        input: SelectPrompt
    }
}