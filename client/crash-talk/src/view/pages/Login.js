import React, { useContext, useEffect, useState } from "react";
import Button from "../components/UI/Button";
import classes from "./Login.module.css";
import { AuthContext } from "../../stores/auth-context";
import { Link, useNavigate } from "react-router-dom";
import GV from "../../stores/CONSTANTS/global_variables";
import action from "../../actions/action";
import Card from "../components/UI/Card";
import useInput from "../../hooks/use-input";
import validator from "../../stores/validator/validator";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const redirector = useNavigate();
  const [inputLoginData, setInputLoginData] = useState(
    GV.getDefaultLoginForm()
  );
  const [requestIsCompleted, setRequestIsCompleted] = useState(false);

  const {
    inputValue: inputEmail,
    inputValidity: emailValidity,
    inputHasError: emailHasError,
    onBlurHandler: emailOnBlurHandler,
    onChangeHandler: emailOnChangeHandler,
    resetInputValue: emailReset,
  } = useInput(validator.emailValidator);

  const {
    inputValue: inputPassword,
    inputValidity: passwordValidity,
    inputHasError: passwordHasError,
    onBlurHandler: passwordOnBlurHandler,
    onChangeHandler: passwordOnChangeHandler,
    resetInputValue: passwordReset,
  } = useInput(validator.passwordValidator);

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    setInputLoginData({
      email: inputEmail,
      password: inputPassword,
    });

    action.callLoginAction(inputLoginData);
    authCtx.loginStatusHandler(action.dispatch());
    setRequestIsCompleted(true);
    emailReset();
    passwordReset();
    setInputLoginData(GV.getDefaultLoginForm);
  };

  useEffect(() => {
    setTimeout(() => {
      if (requestIsCompleted) redirector("/home");
    }, 500);
  }, [requestIsCompleted]);

  return (
    <Card>
      <form onSubmit={loginSubmitHandler}>
        <div>
          <h1 className={classes.h1}>SIGN IN</h1>
          <input
            id={"email"}
            type="email"
            placeholder={"User Email"}
            onChange={emailOnChangeHandler}
            onBlur={emailOnBlurHandler}
            value={inputEmail}
            className={classes.input}
          />

          {emailHasError && <p>유효한 형식의 이메일을 입력 해주세요.</p>}
        </div>
        <div>
          {" "}
          <input
            id={"password"}
            type="password"
            placeholder={"Password"}
            onChange={passwordOnChangeHandler}
            onBlur={passwordOnBlurHandler}
            value={inputPassword}
            className={classes.input}
          />
          {passwordHasError && <p>패스워드는 6자 이상이어야 합니다.</p>}
        </div>
        <div>
          <Button type={"submit"} className={classes.button}>
            SIGN IN
          </Button>
        </div>
      </form>
      <Link to={"/register"}>
        <Button className={classes.button}>SIGN UP</Button>
      </Link>
    </Card>
  );
};

export default Login;
