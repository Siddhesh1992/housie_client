import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./context";
export default function Login() {
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [pass, setPass] = useState("");

  console.log(state);

  const generateOtp = () => {
    state.socket.emit("/generateOtp", { mobile });
  };

  useEffect(() => {
    const messageListener = (result) => {
      if (result.msg === "success") {
        localStorage.setItem("user", JSON.stringify(result.data));
        dispatch({ type: "USER", payload: result.data });
      }
    };

    try {
      state.socket.on("success", messageListener);
    } catch (e) {}

    return () => {
      try {
        state.socket.off("success", messageListener);
      } catch (e) {}
    };
  }, [dispatch, state.socket]);

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
      <button onClick={() => navigate("/room")}>Login</button>
      <button onClick={generateOtp}>Generate OTP</button>
    </div>
  );
}
