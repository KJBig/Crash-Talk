import React, { useState, useContext, useEffect } from "react";
import Button from "../components/UI/Button";
import { AuthContext } from "../../stores/auth-context";
import GV from "../../stores/CONSTANTS/global_variables";
import action from "../../actions/action";
import Card from "../components/UI/Card";
import classes from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import validator from "../../stores/utils/validator/validator";

const Register = () => {
  const authCtx = useContext(AuthContext);
  const redirector = useNavigate();
  const [userInputForm, setUserInputForm] = useState(GV.getDefaultUserForm);
  const [nickNameCheckExsistence, setNickNameCheckExsistence] = useState(true);
  const [requestIsCompleted, setRequestIsCompleted] = useState(false);

  const JWT = localStorage.getItem("JWT");
  if (JWT) redirector("/login");

  console.log("re-rendered");
  const {
    // 커스텀 훅을 통한 입력값 유효성 관리
    inputValue: inputName,
    inputValidity: NameValidity,
    inputHasError: nameHasError,
    onBlurHandler: nameOnBlurHandler,
    onChangeHandler: nameOnChangeHandler,
    resetInputValue: nameReset,
  } = useInput(validator.nameValidator);
  const {
    inputValue: inputEmail,
    inputValidity: emailValidity,
    inputHasError: emailHasError,
    onBlurHandler: emailOnBlurHandler,
    onChangeHandler: emailOnChangeHandler,
    resetInputValue: emailReset,
  } = useInput(validator.emailValidator);
  const {
    inputValue: inputNickName,
    inputValidity: nickNameValidity,
    inputHasError: nickNameHasError,
    onBlurHandler: nickNameOnBlurHandler,
    onChangeHandler: nickNameOnChangeHandler,
    resetInputValue: nickNameReset,
  } = useInput(validator.nameValidator);
  const {
    inputValue: inputPassword,
    inputValidity: passwordValidity,
    inputHasError: passwordHasError,
    onBlurHandler: passwordOnBlurHandler,
    onChangeHandler: passwordOnChangeHandler,
    resetInputValue: passwordReset,
  } = useInput(validator.passwordValidator);

  // const inputChangeHandler = (event) => {
  //   setRegisterData({ ...registerData, [event.target.id]: event.target.value });
  // };

  const onCheckNameExistentHandler = (event) => {
    console.log(inputName);
    action.callCheckExistsAction(inputName);
    setNickNameCheckExsistence(action.dispatch().validity);
  };

  const registerSubmitHandler = async (event) => {
    event.preventDefault();
    if (NameValidity && nickNameValidity && emailValidity && passwordValidity)
      setUserInputForm({
        name: inputName,
        nickname: inputNickName,
        email: inputEmail,
        password: inputPassword,
      });

    action.callRegisterAction(userInputForm); // 액션 발생 및 액션 객체 데이터 전달
    const response = await action.dispatch();
    if (response.data.validity) setRequestIsCompleted(true);
    authCtx.loginStatusHandler(response); // 디스패치 함수 실행 결과로 반환된 프라미스 객체를 인수로 전달

    nameReset();
    nickNameReset();
    emailReset();
    passwordReset();
    setUserInputForm(GV.getDefaultUserForm());
  };

  useEffect(() => {
    if (requestIsCompleted) redirector("/home");
  }, [requestIsCompleted]);

  return (
    <Card>
      <header className={""}></header>
      <form className={""} onSubmit={registerSubmitHandler}>
        <div className={""}>
          <input
            id={"name"}
            type="text"
            placeholder="Name"
            className={classes.input}
            onChange={nameOnChangeHandler}
            onBlur={nameOnBlurHandler}
            value={inputName}
          />
          <Button type={"button"} onClick={onCheckNameExistentHandler}>
            check existence
          </Button>
          {nameHasError && <p>이름은 두 글자 이상이어야 합니다.</p>}
        </div>
        <div className={""}>
          <input
            id={"nickname"}
            type="text"
            placeholder="NickName"
            className={classes.input}
            onChange={nickNameOnChangeHandler}
            onBlur={nickNameOnBlurHandler}
            value={inputNickName}
          ></input>
          {nickNameHasError && <p>닉네임은 두 글자 이상이어야 합니다.</p>}
          {!nickNameCheckExsistence && <p>닉네임이 중복됩니다.</p>}
        </div>
        <div className={""}>
          <input
            id={"email"}
            type="email"
            placeholder="Email"
            className={classes.input}
            onChange={emailOnChangeHandler}
            onBlur={emailOnBlurHandler}
            value={inputEmail}
          />
          {emailHasError && <p>유효한 형식의 이메일을 입력 해주세요.</p>}
        </div>
        <div className={""}>
          <input
            id={"password"}
            type="password"
            placeholder="Password"
            className={classes.input}
            onChange={passwordOnChangeHandler}
            onBlur={passwordOnBlurHandler}
            value={inputPassword}
          />
          {passwordHasError && <p>패스워드는 6자 이상이어야 합니다.</p>}
        </div>
        <Button
          className={classes.button}
          type="submit"
          onClick={registerSubmitHandler}
        >
          Register
        </Button>
      </form>
    </Card>
  );
};

export default Register;
