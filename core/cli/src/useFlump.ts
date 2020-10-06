import {FlumpConfiguration} from "@flump/registry";
import {useMemo} from 'react';
import {ContextRunner} from "@flump/runner/lib/context";

export const useFlump = (args: string[], flump: FlumpConfiguration): React.ComponentType => {
    const context = useMemo(() => new ContextRunner(flump, args), [flump, args])

    return null;

}