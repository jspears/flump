export interface PromptTypes {
}

export interface ActionTypes {
}

export interface FilterTypes {
}

export type PromptTypeKey = keyof PromptTypes;
export type ActionTypeKey = keyof ActionTypes;

export type Prompt<T extends PromptTypeKey = PromptTypeKey> = {
    type: keyof PromptTypes;
    shortOption: string;
    message: string;
    default: () => Promise<unknown> | unknown;
    when?(result: unknown): boolean | Promise<boolean>;
    validate?(result: unknown): string | Promise<string | void>;
    filter?(result: unknown): unknown | Promise<unknown>;
    transform?(value: string, result: unknown): unknown | Promise<unknown>;
} & PromptTypes[T];

type PromptName<T extends PromptTypeKey = PromptTypeKey> = Prompt<T> & { name: string; };

type PromptsConfig = Record<string, (Prompt | PromptName)>;

export type Action<T extends ActionTypeKey = ActionTypeKey> = {
    type: T;
    failOnError?: boolean;
    force?: boolean;
    skip?(result: unknown): Promise<boolean>;
} & ActionTypes[T];

export type Command = {
    name: string;
    actions: Action | Action[];
} | Action[] | Action;

type CommandConfig = Record<string, Command> ;

export type Configuration = {
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
    evaluate(template: string, result: unknown): Promise<string>;
    log(level: Level, message: string): void;
    progress(current: number, total: number, message: string): void;
}
export type ActionFn<T extends ActionTypeKey = ActionTypeKey> = (result: unknown, conf: Action<T>, context: Context) => string | void | Promise<string | void>
export type PromptFn<T extends PromptTypeKey = PromptTypeKey> = (result: unknown, conf: Prompt<T>, context: Context) => unknown | Promise<unknown>;
