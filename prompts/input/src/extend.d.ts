import {InputPrompt} from "./index";

declare module '@flump/registry' {
    interface Prompts {
        input: InputPrompt
    }
}