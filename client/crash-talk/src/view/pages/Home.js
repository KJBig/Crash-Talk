import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Action from "../../actions/action";
import Button from "../components/UI/Button";
import { AuthContext } from "../../stores/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);
  Action.callLoadHomeAction(authCtx.loginUserStatus); // 유저 정보를 전달하여 유저에 맞는 채팅방 목록을 불러옴
  const { chatList } = Action.dispatch();
  const canJoin = false;
  const logoutHandler = (e) => {
    e.preventDefault();
    Action.callLogoutAction();
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    Action.callJoinRoomAction({
      room_id: e.target.key,
      user: authCtx.loginUserStatus,
    });
    const canJoin = Action.dispatch();
  };

  useEffect(() => {
    if (canJoin) {
    }
  }, [canJoin]);

  return (
    <div className={"classes.joinOuterContainer"}>
      {chatList.map((room) => {
        return (
          <div onClick={joinRoomHandler} key={room.id}>
            {room.name}
            {room.members}
          </div>
        );
      })}
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Home;
