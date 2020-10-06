import React from 'react';
import {promptTypes} from '@flump/registry';
import './declare';
import {ChoicesComponent} from "./choices";
import {Option} from "./declare";
import {ChoiceOption} from "./components/item";

promptTypes.register('select', (conf, ctx) => {
    const message = conf.message ? ctx.compile(conf.message) : () => '';
    return async (result, onSubmit) => {
        const choices = typeof conf.choices === 'function' ? await conf.choices(result) : conf.choices;

        return <ChoicesComponent isNumericInputEnabled={conf.isNumericInputEnabled || false}
                                 message={await message(result)}
                                 onSubmit={onSubmit}
                                 items={choices.map(toChoice)}/>
    }
});

const toChoice = (label: Option): ChoiceOption => typeof label === 'string' ? {
    label,
    value: label
} : label;
