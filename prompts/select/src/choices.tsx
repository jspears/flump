import React, {useCallback} from 'react';
import {Question, useEnterKeyHandler} from '@flump/utils';
import {ChoicesList} from './components/choices-list';
import {ChoiceOption} from './components/item';
import {useChoicesNavigation} from './use-choices-navigation';
import {useNumericInputHandler} from './use-numeric-input-handler';
import {OnResult} from "@flump/registry";

interface Choices {
    message?: string;
    isNumericInputEnabled: boolean;
    items: ChoiceOption[];
}

interface ChoicesProps extends Choices {
    onSubmit: OnResult
}

export function ChoicesComponent({
                                     message,
                                     isNumericInputEnabled,
                                     items,
                                     onSubmit,
                                 }: ChoicesProps) {
    const highlightedItem = useChoicesNavigation(items);

    const submitResult = useCallback(() => {
        onSubmit(highlightedItem.value);
    }, [highlightedItem, onSubmit]);

    const handleNumericInput = useCallback(
        item => {
            if (!isNumericInputEnabled) {
                return;
            }
            onSubmit(item.value);
        },
        [isNumericInputEnabled, onSubmit]
    );

    useEnterKeyHandler(submitResult);

    useNumericInputHandler({
        items,
        onNumericInput: handleNumericInput,
    });

    return (
        <React.Fragment>
            {message && <Question message={message}/>}
            <ChoicesList
                items={items}
                highlightedItem={highlightedItem}
                isNumericInputEnabled={isNumericInputEnabled}
            />
        </React.Fragment>
    );
}
