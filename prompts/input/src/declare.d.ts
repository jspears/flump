import '@flump/registry';
import {ContextOrType} from "@flump/registry";


declare module '@flump/registry' {
    interface PromptTypes {
        input: {
            placeholder?: ContextOrType<string>;
        };
    }
}
