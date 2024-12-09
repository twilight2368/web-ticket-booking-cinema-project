import { useState, createContext } from "react";
export const AppContext = createContext(null);

export default function LoginProvider(props) {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <AppContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
      {props.children}
    </AppContext.Provider>
  );
}
