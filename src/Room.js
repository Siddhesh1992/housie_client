import React, { useContext, useEffect, useState } from "react";
import { Context } from "./context";
export default function Room() {
  const { state, dispatch } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");

  console.log(state);
  useEffect(() => {
    const messageListener = ({ room }) => {
      setRoom(room);
    };
    const joinRoomResponse = ({ users }) => {
      console.log(users, "users");
      if (users && users.length) {
        setUsers(users);
      }
      // setUsers(users);
    };
    state.socket.on("/createJoinPublicResponse", messageListener);
    state.socket.on("/joinedRoomResponse", joinRoomResponse);

    return () => {
      state.socket.off("/createJoinPublicResponse", messageListener);
      state.socket.off("/joinedRoomResponse", joinRoomResponse);
    };
  }, [state.socket]);

  const createJoinPublic = () => {
    state.socket.emit("/createJoinPublicRequest", {
      mobile: state.user.mobile,
    });
  };

  return (
    <div>
      <div>You have Joined: {room}</div>
      {users.map((user) => (
        <div>{user.mobileNo + " as joined"}</div>
      ))}
      <button onClick={createJoinPublic}>Create/Join public Room</button>
      <button onClick={() => {}}>Create Private Room</button>
      <button onClick={() => {}}>Create Public Room</button>
      <button onClick={() => {}}>Leave Room</button>
    </div>
  );
}
