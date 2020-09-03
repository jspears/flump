import {registerPromptType} from '@flump/registry';

type ResultFn = (result: unknown) => string | Promise<string>;
export type InputPrompt = {
    placeholder?: ResultFn;
}

declare module '@flump/registry' {
    interface PromptTypes {
        input: InputPrompt;
    }
}

registerPromptType('input', async (result, config) => {
    
})