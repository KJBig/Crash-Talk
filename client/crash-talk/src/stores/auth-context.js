import React, { createContext, useEffect, useState } from "react";
import GV from "./CONSTANTS/global_variables";
import setAuthorization from "./utils/setAuthorization";

const defaultContext = {
  // 컨텍스트 훅 사용을 위한 스탠다드 객체 탬플릿
  loginUserStatus: {},
  loginStatusHandler: () => {},
  userRoomHandler: (roomData) => {},
  userChatHandler: (chatData) => {},
};

const defaultUser = GV.getDefaultUserForm();
export const AuthContext = createContext(defaultContext);

export const AuthContextProvider = (props) => {
  const [loginUserStatus, setLoginUserStatus] = useState(defaultUser); // 로그인한 유저 정보에 대한 상태
  const [userRoom, setUserRoom] = useState(GV.getDefualtRoomForm());
  const [userChat, setUserChat] = useState(GV.getDefualtChatForm());

  const userRoomHandler = (roomData) => {
    setUserRoom({
      id: roomData.id,
      members: roomData.members,
    });
  };

  const userChatHandler = (chatData) => {
    setUserChat({
      id: chatData.id,
      members: chatData.members,
    });
  };

  const loginStatusHandler = (res) => {
    // 로그인 상태 핸들러
    res.then((res) => {
      if (res.data.validity) {
        // 요청이 정상적으로 처리된 경우
        localStorage.setItem("token", res.data.token); //response 로 전달받은 토큰을 브라우저 저장소에 저장
        setAuthorization();
        setLoginUserStatus(res.data.user); // 유저 정보를 전역으로 관리함
      } else {
        alert(res.data.reason); // 사용자에게 가입 실패 이유룰 전달
      }
    });
  };

  const dynamicContext = {
    loginUserStatus,
    loginStatusHandler,
    userRoomHandler,
    userChatHandler,
  };

  return (
    <AuthContext.Provider value={dynamicContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
