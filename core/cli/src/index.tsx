#!/usr/bin/env ts-node
import {render, Text, useInput} from 'ink';
import React, {useContext} from 'react';
import {AppType, AppContext, AppContextProvider} from "./AppContext";

function Content() {
    const ctx = useContext(AppContext) as AppType;
    useInput((input, key) => {
        if (input === 'q') {
            process.exit(0);
        }

        if (key.leftArrow) {
            if (ctx.current > 0) {
                ctx.onChange(ctx.current - 1);
            }
        } else if (key.rightArrow) {
            ctx.onChange(ctx.current + 1);
        }
    });
    if (!ctx?.current) {
        return (<Text>No Step</Text>);
    }
    return <Text>{ctx.label}</Text>
}


function App() {
    return (
        <AppContextProvider steps={['step1', 'step2', 'step3']}>
            <Content/>
        </AppContextProvider>
    )
}

export const app = render(<App/>, {
    debug: false,
});
