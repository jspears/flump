import {Action, ActionTypes, FilterTypes, Prompt, PromptTypes, RegFn} from "./types";


export class Registry<Types, C = {}> {
    constructor(private map = new Map<string | keyof Types, RegFn<any>>()) {
    }

    register<T extends keyof Types | string>(name: T, fn: T extends keyof Types ? RegFn<Types[T] & C> : RegFn<C>): this {
        this.map.set(name, fn);
        return this;
    }

    resolve<T extends keyof Types | string>(name: T): T extends keyof Types ? RegFn<Types[T] & C> : RegFn<C> {
        const result = this.map.get(name);
        if (result === void (0)) {
            throw new Error(`'${name}': is not registered`)
        }
        return result as any;
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
export const promptTypes = new Registry<PromptTypes, Prompt>();
/**
 * Actions are executed using the answers provided by the prompts.
 */
export const actionTypes = new Registry<ActionTypes, Action>();

/**
 * Filters are functions, that convert some (string) input before ouputing.
 * They can be templates, strings, or even code formatters like prettier.
 */
export const filterTypes = new Registry<FilterTypes>();
