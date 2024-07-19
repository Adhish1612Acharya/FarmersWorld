import { Form } from "react-router-dom";
import Button from "@mui/material/Button";
import TextInput from "./TextInput.js";
import "../styles/Form.css";
import Navbar from "./NavBar.js";
import { ChangeEvent, FC, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../serv.js";
import {
  signUpFormProps,
  valueObj,
  errorObj,
} from "../types/componentsTypes/SignUpForm.js";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  signUp,
  setFormData,
  validateForm,
} from "../store/features/otherPages/SignUpPageSlice";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme.js";

const SignUpForm: FC<signUpFormProps> = ({ route }) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  let value = useAppSelector((state) => state.signUpPage.value);
  let error = useAppSelector((state) => state.signUpPage.error);

  let setInputData = (event: ChangeEvent<HTMLInputElement>): void => {
    event.target;
    dispatch(
      setFormData({ name: event.target.name, value: event.target.value })
    );
  };

  let preventFormDefault = async (
    event: React.FormEvent<HTMLFormElement>,
    apiRoute: string
  ): Promise<void> => {
    event.preventDefault();
    dispatch(validateForm({ loginData: value, error: error }));

    dispatch(signUp({ apiRoute, value, navigate }));
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <div className="form">
          <Navbar login={false} />
          <h2>SignUp</h2>
          <Form
            onSubmit={(event) => {
              preventFormDefault(event, route);
            }}
          >
            <TextInput
              typeValue={"text"}
              value={value.username}
              name="username"
              labelText={"Enter username"}
              outerLabel={"Username"}
              setForm={setInputData}
              errors={error.username}
            />

            <TextInput
              typeValue={"text"}
              value={value.email}
              name="email"
              labelText={"Enter email"}
              outerLabel={"Email"}
              setForm={setInputData}
              errors={error.email}
            />

            <TextInput
              typeValue={"password"}
              value={value.password}
              name="password"
              labelText={"Enter password"}
              outerLabel={"Password"}
              setForm={setInputData}
              errors={error.password}
            />

            <Button variant="contained" type="submit">
              SignUp
            </Button>
          </Form>
        </div>
      </>
    </ThemeProvider>
  );
};

export default SignUpForm;
