import {ActionFn, ActionTypes, Context, FilterTypes, PromptFn, PromptTypes} from "./types";

class Registry<Types, Fn = (result: unknown, conf: Types[keyof Types], context: Context) => Promise<unknown>> {
    private map = new Map<keyof Types, Fn>();

    set(name: keyof Types, fn: Fn): this {
        this.map.set(name, fn);
        return this;
    }

    resolve(name: keyof Types): Fn | undefined {
        return this.map.get(name);
    }
}

export type FilterConfig<T> = {
    sourceType: 'content' | 'file';
    encoding?: string;
} & T;
/**
 * Prompts are responsible for handling input
 * from users.  The have functions for transorming and validating
 * such content.
 */
export const promptTypes = new Registry<PromptTypes, PromptFn>();
/**
 * Actions are executed using the answers provided by the prompts.
 */
export const actionTypes = new Registry<ActionTypes, ActionFn>();
/**
 * Filters are functions, that convert some (string) input before ouputing.
 * They can be templates, strings, or even code formatters like prettier.
 */
export const filterTypes = new Registry<FilterTypes, (source: string, config: FilterConfig<FilterTypes[keyof FilterTypes]>, context: Context) => Promise<string>>();