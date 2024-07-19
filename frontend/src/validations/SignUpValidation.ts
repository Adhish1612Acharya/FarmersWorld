interface signUpDataObj {
  username: string;
  email: string;
  password: string;
}

interface errorKeyObj {
  errMsg: string;
  valid: boolean;
}

interface newErrorsObj {
  username: errorKeyObj;
  email: errorKeyObj;
  password: errorKeyObj;
}

type validateFormfunc = (
  signUpData: signUpDataObj,
  newErrors: newErrorsObj
) => newErrorsObj;

let validateForm: validateFormfunc = (signUpData, newErrors) => {
  if (signUpData.username === "") {
    newErrors.username.errMsg = "Name is required";
    newErrors.username.valid = true;
  }

  if (signUpData.email === "") {
    newErrors.email.errMsg = "Enter a email";
    newErrors.email.valid = true;
  }

  if (signUpData.password === "") {
    newErrors.password.errMsg = "Password  is required";
    newErrors.password.valid = true;
  }

  return newErrors;
};

export { validateForm };
