import {actionTypes} from "@flump/registry";
import {command} from 'execa';

actionTypes.register('exec', (conf, context) => async () => {

    await command(conf.command, conf.options);
});
