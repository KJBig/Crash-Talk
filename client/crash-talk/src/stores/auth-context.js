import React, { createContext, useEffect, useState } from "react";
import GV from "./CONSTANTS/global_variables";

const defaultContext = {
  // 컨텍스트 훅 사용을 위한 스탠다드 객체 탬플릿
  loginUserStatus: {},
  loginStatusHandler: () => {},
};

export let dataTransferred = undefined;

const defaultUser = GV.getDefaultUserForm();

export const AuthContext = createContext(defaultContext);
export const AuthContextProvider = (props) => {
  const [loginUserStatus, setLoginUserStatus] = useState(defaultUser); // 유저 정보에 대한 상태

  const loginStatusHandler = (res) => {
    // 로그인 이벤트 핸들러
    res.then((res) => {
      const data = res.data;
      if (data.validity) {
        localStorage.setItem("token", "true"); //값 수정 필요
        setLoginUserStatus(data.userInfo);
      } else {
        alert(data.reason);
      }
    });
  };

  const dynamicContext = {
    loginUserStatus: loginUserStatus,
    loginStatusHandler: loginStatusHandler,
  };

  return (
    <AuthContext.Provider value={dynamicContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
