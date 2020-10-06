import React, { createContext, useCallback, useState } from "react";

export type AppType = {
  onChange(step: number): void;
  valid: boolean;
  onValidate(valid: boolean): void;
  current: number;
  label: string;
};
export const AppContext = createContext<AppType | null>(null);

type AppContextProviderProps = {
  steps: string[];
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  steps,
  children,
}) => {
  const [current, handleChange] = useState(0);

  const [valid, onValidate] = useState(true);

  const onChange = useCallback(
    (change: number): void => {
      if (change - 1 <= steps.length) {
        valid && handleChange(change);
      }
    },
    [current, handleChange, valid]
  );

  return (
    <AppContext.Provider
      value={{
        current,
        valid,
        onValidate,
        onChange,
        label: current > steps.length ? "Done" : steps[current - 1],
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
