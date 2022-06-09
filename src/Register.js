import React, { useContext, useEffect, useState } from "react";
import { Context } from "./context";
export default function Register() {
  const { state } = useContext(Context);
  const [mobile, setMobile] = useState("");
  const [pass, setPass] = useState("");

  const generateOtp = () => {
    state.socket.emit("/generateOtp", { mobile });
  };

  return (
    <div>
      Register
      <input
        type="text"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <input
        type="text"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={generateOtp}>Generate OTP</button>
    </div>
  );
}
