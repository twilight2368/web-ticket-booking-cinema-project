import { useState } from "react";
import { LoginAdminContext } from "./LoginAdminContext";

export default function LoginAdminProvider(props) {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  return (
    <LoginAdminContext.Provider value={{ isAdminLogin, setIsAdminLogin }}>
      {props.children}
    </LoginAdminContext.Provider>
  );
}
