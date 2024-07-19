import { Form } from "react-router-dom";
import Button from "@mui/material/Button";
import TextInput from "./TextInput";
import "../styles/Form.css";
import Navbar from "./NavBar";
import { FC, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../serv.js";
import { loginFormProps } from "../types/componentsTypes/LoginForm";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  login,
  setFormData,
  validateForm,
} from "../store/features/otherPages/LoginPageSlice";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";

const LoginForm: FC<loginFormProps> = ({ route }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let value = useAppSelector((state) => state.loginPage.value);
  let error = useAppSelector((state) => state.loginPage.error);

  let setInputData = (event: ChangeEvent<HTMLInputElement>): void => {
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

    dispatch(login({ apiRoute, value, navigate }));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="form">
        <Navbar login={false} />
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
            typeValue={"password"}
            value={value.password}
            name="password"
            labelText={"Enter password"}
            outerLabel={"Password"}
            setForm={setInputData}
            errors={error.password}
          />

          <Button variant="contained" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </ThemeProvider>
  );
};

export default LoginForm;
