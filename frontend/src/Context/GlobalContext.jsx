import { createContext, useState } from "react";
import { getLocalUserData } from "../utility/localStorage";

export const GlobalContext = createContext();

export default function GlobalStore({ children }) {
  const localUser = getLocalUserData();

  const [user, setUser] = useState(localUser);

  return (
    <GlobalContext.Provider value={[user, setUser]}>
      {children}
    </GlobalContext.Provider>
  );
}
