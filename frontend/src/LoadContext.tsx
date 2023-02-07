import React, { createContext, useState, useContext } from "react";

type contextType = {
  isLoading: boolean;
  setLoading: (v: boolean) => any;
};

type Props = {
  children: React.ReactElement; //should be a component or an html elememt
};

const LoadContext = createContext<contextType | undefined>(undefined);

export default function LoadContextProvider({ children }: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <LoadContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadContext.Provider>
  );
}

export const useLoader = () => useContext(LoadContext);
