import React, { createContext, useContext, useEffect, useState } from "react";
import { useLoader } from "./LoadContext";

type AuthProps = {
  children: React.ReactNode;
};

type ContextType = {
  authData: { name: string };
  onLogin: (v: {}) => any;
  onLogOut: () => any;
};

const AuthContext = createContext<undefined | ContextType>(undefined);

export default function AuthProvider({ children }: AuthProps) {
  const [authData, setAuthData] = useState({ name: "" });
  const loadingContext = useLoader();
  const setLoading = loadingContext?.setLoading;
  console.log("setloading:", setLoading);

  useEffect(() => {
    async function getLoggedUser() {
      console.log("getting user data...");
      const res = await fetch("/users/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });
      try {
        console.log(res);
        if (res.ok) {
          const data = await res.json();
          console.log("fetched user data", data);
          onLogin(data);
          if (setLoading) setLoading(false);
          return data;
        }
        if (setLoading) setLoading(false);
      } catch (e) {
        console.log(e);
        return null;
      }
    }

    getLoggedUser();
    //called just once after mounting, whenever you call some func inside the use effect, we should add the func in the dependency array
  }, [setLoading]);

  const onLogin = (v: any) => setAuthData(v);
  const onLogOut = () => setAuthData({ name: "" });
  return (
    <AuthContext.Provider value={{ authData, onLogin, onLogOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
