import React from "react";
import { useContext, useState } from "react";

type MyContextProps = {
  children: React.ReactNode;
};
export const MyContext = React.createContext("");

function MyContextProvider({ children }: MyContextProps) {
  const myUser = "Rania";

  return <MyContext.Provider value={myUser}>{children}</MyContext.Provider>;
}
export default MyContextProvider;

export const Userconsumer = () => useContext(MyContext);
