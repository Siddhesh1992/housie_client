import React, { useEffect, useReducer } from "react";
import { Context } from "./context";
import { Routes, Route } from "react-router-dom";
import { initialState } from "./context";
import reducer from "./context/reducer";
import Login from "./Login";
import Room from "./Room";
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // global error
  useEffect(() => {
    const messageListener = (result) => {
      alert(result.msg);
    };

    if (sessionStorage.getItem("user")) {
      dispatch({
        type: "USER",
        payload: JSON.parse(sessionStorage.getItem("user")),
      });
    }
    try {
      state.socket.on("error", messageListener);
      state.socket.on("success", messageListener);

      state.socket.on("connect", () => {
        dispatch({ type: "SOCKET_ID", payload: state.socket.id });
        if (sessionStorage.getItem("user")) {
          state.socket.emit("/userConnected", {
            user: JSON.parse(sessionStorage.getItem("user")),
          });
        }
        // state.user &&
        //   state.socket.emit("/connected", { socketId: socket.id, user: state.user._id });
      });
    } catch (e) {}

    return () => {
      try {
        state.socket.off("error", messageListener);
        state.socket.off("success", messageListener);
      } catch (e) {}
    };
  }, [state.socket]);

  return (
    <Context.Provider
      value={{ state, dispatch }}
      displayName="Context Display Name"
    >
      My Socket ID: {state.socket_id} {process.env.REACT_APP_NODE_ENV}
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/room"} element={<Room />} />
      </Routes>
    </Context.Provider>
    // <div className="App">
    //   <header className="app-header">React Chat</header>
    //   {socket.id}
    //   <div className="chat-container">
    //     <button onClick={test}>test</button>
    //   </div>
    // </div>
  );
}

export default App;
