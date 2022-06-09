import React, { useEffect, useReducer } from "react";
import { Context } from "./context";
import { Routes, Route } from "react-router-dom";
import { initialState } from "./context";
import reducer from "./context/reducer";
import Login from "./Login";
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // global error
  useEffect(() => {
    const messageListener = (msg) => {
      console.log(msg);
    };
    state.socket.on("error", messageListener);
    state.socket.on("success", messageListener);

    return () => {
      state.socket.off("error", messageListener);
      state.socket.off("success", messageListener);
    };
  }, [state.socket]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Routes>
        <Route path={"/"} element={<Login />} />
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
