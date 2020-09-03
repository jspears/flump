import {promptTypes} from '@flump/registry';

type Option = string | { name: string; label: string; }
type ResultFn = (result: unknown) => Option[] | Promise<Option[]>;

export type SelectPrompt = {
    options?: ResultFn;
}
declare module '@flump/registry' {
    interface PromptTypes {
        select: SelectPrompt
    }
}
promptTypes.set('select', () => {

});