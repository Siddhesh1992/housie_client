import React from "react";
import socketio from "socket.io-client";
const { io } = require("socket.io-client");

const SOCKET_URL = `http://localhost:3000`;

const local = true;

export const socket =
  process.env.REACT_APP_NODE_ENV === "development"
    ? socketio.connect(SOCKET_URL)
    : io();

export const initialState = {
  socket,
  user: null,
};

export const Context = React.createContext();
