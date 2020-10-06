import {promptTypes} from '@flump/registry';

promptTypes.register('input', (config, context) => async (results) => {
    console.log('input', config.placeholder ? 'true' : 'false');
});