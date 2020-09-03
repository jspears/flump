import {ActionTypes, PromptTypes} from "@flump/registry";


type Prompt<T extends keyof PromptTypes> = {
    type: keyof PromptTypes;
    shortOption: string;
    message: string;
    default: () => Promise<unknown> | unknown;
    when?(result: unknown): boolean | Promise<boolean>;
    validate?(result: unknown): string | Promise<string | void>;
    filter?(result: unknown): unknown | Promise<unknown>;
    transform?(value: string, result: unknown): unknown | Promise<unknown>;
} & PromptTypes[T];

type PromptName<T extends keyof PromptTypes> = Prompt<T> & { name: string; };

type PromptsConfig = Record<string, (Prompt<any> | PromptName<any>)>;

type Action<T extends keyof ActionTypes> = {
    type: T;
    failOnError?: boolean;
    force?: boolean;
    skip?(result: unknown): Promise<boolean>;
} & ActionTypes[T];

type Command = {
    name: string;
    actions: Action<any> | Action<any>[];
} | Action<any>[] | Action<any>;

type CommandConfig = Record<string, Command> ;

type Configuration = {
    prompts: PromptsConfig;
    commands: CommandConfig;
}
