import React from "react";
import socketio from "socket.io-client";
const SOCKET_URL = "http://localhost:3000";

export const socket = socketio.connect(SOCKET_URL);

export const initialState = {
  socket,
  user: null,
};

export const Context = React.createContext();
