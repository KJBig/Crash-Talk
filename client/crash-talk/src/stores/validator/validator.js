const validator = (function () {
  const nameValidator = (val) => {
    return val.trim().length >= 2;
  };

  const emailValidator = (val) => {
    return val.includes("@");
  };

  const passwordValidator = (val) => {
    return val.trim().length >= 6;
  };

  return {
    nameValidator,
    emailValidator,
    passwordValidator,
  };
})();

export default validator;
