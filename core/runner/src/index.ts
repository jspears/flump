import '@flump/prompt-select/src';
import {FlumpConfiguration, promptTypes} from '@flump/registry';
import {ContextRunner} from "./context";

type CommandType = keyof FlumpConfiguration['commands'];

export async function run(config: FlumpConfiguration, argv: string[] = process.argv, env = process.env) {
    const commands = Object.keys(config.commands);
    let cmd: CommandType = config.commands[argv[2]] ? argv[2] : commands.length == 1 ? commands[0] : null;
    if (!cmd) {

        const ask = promptTypes.resolve('select');
        await ask({choices: ['one', 'two', 'three']}, new ContextRunner({}, ''));
        // ask({choices: commands}, )
        // cmd = (await ask(null, {
        //     choices: commands,
        // }, context('flump'))) as string;
    }
    if (cmd != null) {
        const ctx = new ContextRunner(config, cmd);
    }
}