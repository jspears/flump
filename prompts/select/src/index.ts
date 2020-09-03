type Option = string | { name: string; label: string; }
type ResultFn = (result: unknown) => Option[] | Promise<Option[]>;

export type SelectPrompt = {
    options?: ResultFn;
}

