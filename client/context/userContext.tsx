import React, { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

interface UserContextType {
  user: any;
  setUser: any;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => setUser(data));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
