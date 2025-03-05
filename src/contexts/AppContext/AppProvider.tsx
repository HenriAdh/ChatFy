import { PropsWithChildren, useEffect, useState } from "react";
import { AppContext } from ".";
import { STORAGE_USER } from "../../settings";

export function AppProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const prevUser = window.localStorage.getItem(STORAGE_USER);
    if (prevUser) {
      setUser(prevUser);
    }
  }, []);

  return (
    <AppContext.Provider value={{ setUser, user }}>
      {children}
    </AppContext.Provider>
  );
}
