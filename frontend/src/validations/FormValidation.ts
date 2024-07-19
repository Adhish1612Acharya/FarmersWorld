interface valueObj {
  adhaar: string;
  farmersId: string;
}
interface errorKeyObj {
  errMsg: string;
  valid: boolean;
}

interface newErrorsObj {
  adhaar: errorKeyObj;
  farmersId: errorKeyObj;
}

type validateFormFunc = (
  value: valueObj,
  newErrors: newErrorsObj
) => newErrorsObj;

let validateForm: validateFormFunc = (value, newErrors) => {
  if (value.adhaar === "") {
    newErrors.adhaar.errMsg = "Adhaar Number is required";
    newErrors.adhaar.valid = true;
  }

  if (value.farmersId === "") {
    newErrors.farmersId.errMsg = "Unique farmers Id is required";
    newErrors.farmersId.valid = true;
  }

  return newErrors;
};

export { validateForm };
