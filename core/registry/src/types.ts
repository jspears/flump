export interface PromptTypes {
}

export interface ActionTypes {
}

export interface FilterTypes {
}

export type Result = unknown;

export type OnResult = (result: Result) => void;

export type ResultFn = (result: Result, onSubmit: OnResult) => void | unknown | Promise<unknown | void>

export type RegFn<T> = (conf: T, context: Context) => ResultFn | Promise<ResultFn>;

export type ContextOrType<T> = T | ((result: Result) => T | Promise<T>);

export type PromptTypeKey = keyof PromptTypes;
export type ActionTypeKey = keyof ActionTypes;

export type Prompt = {
    shortOption?: string;
    message?: string;
    default?: () => Promise<unknown> | unknown;
    when?(result: unknown): boolean | Promise<boolean>;
    validate?(result: unknown): string | Promise<string | void>;
    filter?(result: unknown): unknown | Promise<unknown>;
    transform?(value: string, result: unknown): unknown | Promise<unknown>;
};

export type PromptConfig = Prompt & {
    type: keyof PromptTypes | string;
};

type PromptName = PromptConfig & { name: string; };

type PromptsConfig = Record<string, (PromptConfig | PromptName)>;

export type Action = {
    failOnError?: boolean;
    force?: boolean;
    skip?(result: unknown): Promise<boolean>;
}
export type ActionConfig = Action & {
    type: keyof ActionTypes | string;
}

export type Command = ActionConfig[] ;

type CommandConfig = { [key: string]: Command } ;

export type FlumpConfiguration = {
    prompts: PromptsConfig;
    commands: CommandConfig;
}

export enum Level {
    debug,
    info,
    warn,
    error,
}

export type Context = {
    /**
     * Describes the data that this command
     * uses.  Each command can add multiple keys.
     *
     * If a key is not satisfied by a defined
     * prompt than the default prompt will be used.
     *
     * @param keys
     */
    use(...keys: string[]): void,
    /**
     * Creates a function that can be used to
     * evaluate a string.  Some templates, will
     * automatically add to the context the required
     *
     *
     * @param template
     */
    compile(template?: string): (result: Result) => string | undefined | Promise<string | undefined>
}
