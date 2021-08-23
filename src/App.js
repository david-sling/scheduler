import React, { useEffect, useState } from "react";
import { addEvent, login } from "./services/google";

export default function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    console.log({ user });
  }, [user]);

  const handleLogin = () => {
    login(setUser);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={addEvent}>Add</button>
    </div>
  );
}
