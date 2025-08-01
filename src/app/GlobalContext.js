"use client";
import { createContext } from "react";
import { useState } from "react";
export const Global = createContext();

export function Globalcontext({ children }) {
  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");
  return (
    <Global.Provider value={{ userid, setUserId, username, setUserName }}>
      {children}
    </Global.Provider>
  );
}
