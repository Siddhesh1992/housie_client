import React, { useContext, useEffect, useState } from "react";
import { Context } from "./context";
export default function Room() {
  const { state, dispatch } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");
  const [publicRoom, setPublicRoom] = useState("");

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
      user: state.user,
    });
  };

  const leaveRoom = () => {
    setUsers([]);
    state.socket.emit("/leaveRoom", {
      room,
      user: state.user,
    });
  };

  return (
    <div>
      <div>You have Joined: {room}</div>
      {users.map((user) => (
        <div>{user.mobile + " as joined"}</div>
      ))}
      <input
        type="text"
        placeholder="roomId"
        value={publicRoom}
        onChange={(e) => setPublicRoom(e.target.value)}
      />
      <button onClick={createJoinPublic}>Create/Join public Room</button>
      <button onClick={() => {}}>Create Private Room</button>
      <button onClick={() => {}}>Create Public Room</button>
      <button onClick={() => leaveRoom()}>Leave Room</button>
    </div>
  );
}
