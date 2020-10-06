import {
    Action,
    actionTypes as _actionTypes,
    Command,
    Context,
    FlumpConfiguration,
    promptTypes as _promptTypes,
    Result,
    ResultFn
} from "@flump/registry";

enum State {
    RESOLVED,
    IN_PROGRESS
}

const newErrorFn = (message: string) => () => {
    throw new Error(message);
}

export class ContextRunner {
    private readonly command: string;

    //null means in progress.
    private readonly resolved: { [key: string]: unknown } = {};
    private readonly state = new Map<string, State>();

    constructor(private readonly configuration: FlumpConfiguration,
                private readonly args: string[] = process.argv.slice(2),
                private readonly promptTypes = _promptTypes,
                private readonly actionTypes = _actionTypes,
    ) {
        if (configuration.commands[args[0]]) {
            this.command = args[0];
        } else {
            const keys = Object.keys(configuration.commands);
            if (keys.length === 1) {
                this.command = keys[0];
            } else {
                this.command = 'choose';
            }
        }
    }

    private context(prompts: Set<string>,
                    ctrl: { allowed: boolean } = {allowed: true}): Context {
        return {
            use(...keys) {
                if (!ctrl.allowed) {
                    throw new Error(`can not call 'use' after returning the function, please do any setup beforehand`)
                }
                keys.forEach(prompts.add, prompts);
            },
            compile(template) {
                if (!ctrl.allowed) {
                    throw new Error(`can not call 'compile' after returning the function, please do any setup beforehand`)
                }
                return () => template;
            },
        }
    }

    async resolvePrompts(prompts: Set<string>): Promise<ResultFn[]> {
        const questions: ResultFn[] = [];
        for (const name of prompts) {
            if (this.state.has(name)) continue;
            this.state.set(name, State.IN_PROGRESS);
            const cfg = this.configuration.prompts[name] || {type: 'input', name};
            const newPrompts = new Set<string>();
            const fn = await this.promptTypes.resolve(cfg.type)(cfg, this.context(newPrompts));
            questions.push(...(await this.resolvePrompts(newPrompts)), fn);
            this.state.set(name, State.RESOLVED);
        }
        return questions;
    }

    async resolve(): Promise<(result: Result) => void> {
        const command: Command = this.configuration.commands[this.command]
        const prompts = new Set<string>();
        const ctrl = {allowed: true};
        const ctx = this.context(prompts, ctrl);
        const actions: ActionResult[] = await Promise.all<ActionResult>(command.map(async (v) => {
            const fn = this.actionTypes.resolve(v.type);
            return [v, await fn(v, ctx)];
        }));
        await this.resolvePrompts(prompts);
        return async (r) => {
            ctrl.allowed = false;
            for (const [cfg, action] of actions) {
                if (await cfg.skip?.(r) ?? true) {
                    await action(r, () => {
                    });
                }
            }
        };
    }
}

type ActionResult = [Action, ResultFn];
