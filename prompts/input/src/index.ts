import {promptTypes} from '@flump/registry';

type ResultFn = (result: unknown) => string | Promise<string>;
export type InputPrompt = {
    placeholder?: ResultFn;
}

declare module '@flump/registry' {
    interface PromptTypes {
        input: InputPrompt;
    }
}

promptTypes.set('input', async (result, config) => {

})