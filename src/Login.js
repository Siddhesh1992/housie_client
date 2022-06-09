import React, { useContext, useEffect, useState } from "react";
import { Context } from "./context";
export default function Login() {
  const { state, dispatch } = useContext(Context);
  const [mobile, setMobile] = useState("");
  const [pass, setPass] = useState("");

  console.log(state);

  const generateOtp = () => {
    state.socket.emit("/generateOtp", { mobile });
  };

  useEffect(() => {
    const messageListener = (result) => {
      if (result.msg === "success") {
        dispatch({ type: "USER", payload: result.data });
      }
    };

    state.socket.on("success", messageListener);

    return () => {
      state.socket.off("success", messageListener);
    };
  }, [state.socket]);

  return (
    <div>
      Login
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
