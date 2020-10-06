import {actionTypes, Result} from "@flump/registry";

actionTypes.register('add', (a, conf) => (result: Result) => {
    console.log('dest', a.dest);
    return;
});