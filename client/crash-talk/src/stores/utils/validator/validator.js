
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // 소문자 숫자 및 특수문자 포함 8자 이상

const validator = (function () {
  const nameValidator = (val) => {
    return val.trim().length >= 2;
  };

  const emailValidator = (val) => {
    return val.includes("@");
  };

  const passwordValidator = (val) => {
    return PWD_REGEX.test(val);
  };

  return {
    nameValidator,
    emailValidator,
    passwordValidator,
  };
})();

export default validator;
