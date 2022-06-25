import React, { useContext, useEffect, useState } from "react";
import { Context } from "./context";
export default function Room() {
  const { state } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");
  const [privateRoomId, setPrivateRoom] = useState("");

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
    state.socket.on("/createJoinResponse", messageListener);
    state.socket.on("/joinedRoomResponse", joinRoomResponse);

    return () => {
      state.socket.off("/createJoinResponse", messageListener);
      state.socket.off("/joinedRoomResponse", joinRoomResponse);
    };
  }, [state.socket]);

  const createJoinPublic = () => {
    state.socket.emit("/createJoinPublicRoom", {
      user: state.user,
    });
  };

  const createPrivate = () => {
    state.socket.emit("/createPrivateRoom", {
      user: state.user,
      roomLimit: 10,
    });
  };

  const leaveRoom = () => {
    setUsers([]);
    state.socket.emit("/leaveRoom", {
      room,
      user: state.user,
    });
  };

  const joinPrivateRoom = () => {
    setUsers([]);
    state.socket.emit("/joinPrivateRoom", {
      user: state.user,
      roomId: privateRoomId,
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
        value={privateRoomId}
        onChange={(e) => setPrivateRoom(e.target.value)}
      />
      <br />
      private Room limit: 10
      <br />
      <button onClick={createJoinPublic}>Create/Join public Room</button>
      <button onClick={createPrivate}>Create Private Room</button>
      <button onClick={joinPrivateRoom}>Join Private Room</button>
      <button onClick={() => leaveRoom()}>Leave Room</button>
    </div>
  );
}
