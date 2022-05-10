import React, { createContext, useReducer } from "react";
import UserReducer, { UserState } from "../modules/user/store/UserReducer";

export const Context = createContext({});

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, UserState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}
export { UserProvider };
export default Context;
