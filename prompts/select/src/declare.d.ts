import {ContextOrType} from '@flump/registry';
import '@flump/registry';

type Option = string | { value: string; label: string; }

type SelectPrompt = {
    choices: ContextOrType<Option[]>;
    multiple?: boolean;
    pageSize?: number;
    isNumericInputEnabled?: boolean;
}

declare module '@flump/registry' {
    interface PromptTypes {
        select: SelectPrompt
    }
}
