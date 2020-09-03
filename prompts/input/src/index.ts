type ResultFn = (result: unknown) => string | Promise<string>;
export type InputPrompt = {
    placeholder?: ResultFn;
}

