import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Action from "../../actions/action";
import Button from "../components/UI/Button";
import { AuthContext } from "../../stores/auth-context";
import setAuthorization from "../../stores/utils/setAuthorization";

const Home = () => {
  // chat은 채팅방, room은 3d 공간을 지칭한다.
  const authCtx = useContext(AuthContext);
  Action.callJoinHomeAction(authCtx.loginUserStatus); // 유저 정보를 전달하여 유저에 맞는 chat 및 room을 불러옴
  const response = Action.dispatch();
  const chat = response.data.chat;
  const room = response.data.room;

  authCtx.userChatHandler(chat);
  authCtx.userRoomHandler(room);

  const logoutHandler = (e) => {
    e.preventDefault();
    Action.callLogoutAction();
  };

  return (
    <div className={"classes.joinOuterContainer"}>
      <Link to={`/room/${room.id}`}>
        <Button>Join Room</Button>
      </Link>
      <Link to={`/chat/${chat.id}`}>
        <Button>Join Chat</Button>
      </Link>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Home;
