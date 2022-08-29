import requester from "../stores/utils/requester";
import GV from "../stores/CONSTANTS/global_variables";
import React from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const useDispatchers = (function () {
  const errorCatcher = (response) => {
    try {
      if (response.status === 200) {
        console.log("200 OK");
      } else if (response.status === 404) {
        console.log("404 Not Found");
      }
    } catch (error) {
      console.log("Catches error: " + error);
    }
  };

  // 디스패쳐 함수들을 관리하는 파일
  const registerDispatcher = async (actionData) => {
    // 회원가입 디스패쳐
    const response = await requester.post(
      GV.getHeaders().register,
      actionData,
      GV.getEndPoint().register
    );
    errorCatcher(response);
    return response;
  };

  const loginDispatcher = async (actionData) => {
    // 로그인 디스패쳐
    const response = await requester.post(
      GV.getHeaders().login,
      actionData,
      GV.getEndPoint().login
    );
    errorCatcher(response);
    return response;
  };

  const logoutDispatcher = async (actionData) => {
    localStorage.clear();
  };

  const joinRoomDispatcher = (actionData) => {};

  const checkExistentDispatcher = async (actionData) => {
    const response = await requester.getExistent(
      GV.getHeaders().check_existent,
      actionData.inputValue,
      GV.getEndPoint().register
    );
    errorCatcher(response);
    return response;
  };

  const joinHomeDispatcher = async (userData) => {
    // user정보를 기반으로 user가 가지고 있는 chat, room 데이터를 불러와야 함.
    const response = await requester.get(
      GV.getHeaders().join_home,
      userData,
      GV.getEndPoint().home
    );
    errorCatcher(response);
    return response;
  };

  const joinChatDispatcher = async (userData) => {
    // chat 로그 불러오기
    const response = await requester.get(userData);

    const socket = io({
      // 소켓 연결
      cors: {
        origin: `${GV.getServerURL()}`,
        methods: ["GET", "POST"],
        credentials: true,
        transports: ["websocket", "polling"],
      },
      allowEI03: true,
    });

    socket.emit("join_room", {
      name: actionData.name,
      room: actionData.room,
      callback: (error) => {
        if (error) {
          alert(error);
        }
      },
    });

    return socket;
  };

  return {
    checkExistentDispatcher,
    registerDispatcher,
    loginDispatcher,
    joinRoomDispatcher,
    joinHomeDispatcher,
    joinChatDispatcher,
  };
})();

export default useDispatchers;
