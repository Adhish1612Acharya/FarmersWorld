interface LoginDataObj {
  username: string;
  password: string;
}

interface errorKeyObj {
  errMsg: string;
  valid: boolean;
}

interface newErrorsObj {
  username: errorKeyObj;
  password: errorKeyObj;
}

type validateFormfunc = (
  loginData: LoginDataObj,
  newErrors: newErrorsObj
) => newErrorsObj;

let validateForm: validateFormfunc = (LoginData, newErrors) => {
  if (LoginData.username === "") {
    newErrors.username.errMsg = "Name is required";
    newErrors.username.valid = true;
  }

  if (LoginData.password === "") {
    newErrors.password.errMsg = "Password  is required";
    newErrors.password.valid = true;
  }

  return newErrors;
};

export { validateForm };
