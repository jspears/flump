import {useCallback} from 'react';
import {ChoiceOption} from './components/item';
import {useKeyHandler} from '@flump/utils';

interface NumericInputHandlerParameters {
    items: ChoiceOption[];
    onNumericInput: (item: ChoiceOption) => void;
}

export function useNumericInputHandler({items, onNumericInput}: NumericInputHandlerParameters) {
    const handleKey = useCallback(
        key => {
            if (!/^\d+?$/.test(key)) {
                return;
            }

            const index = parseInt(key, 10);
            const item = items[index - 1];
            if (!item) {
                return;
            }

            onNumericInput(item);
        },
        [items, onNumericInput]
    );

    useKeyHandler(handleKey);
}
