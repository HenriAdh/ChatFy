import { PropsWithChildren, useState } from "react";
import { AppContext } from ".";

export function AppProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<string>("");

  return (
    <AppContext.Provider value={{ setUser, user }}>
      {children}
    </AppContext.Provider>
  );
}
