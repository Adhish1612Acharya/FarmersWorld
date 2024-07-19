import { Button, ThemeProvider } from "@mui/material";
import TextInput from "./TextInput";
import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateForm } from "../validations/FormValidation";
import { FC, ChangeEvent } from "react";
import {
  ApplicationProps,
  newError,
  value,
  imageErrors,
} from "../types/componentsTypes/Application";
import theme from "../theme";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  applyScheme,
  setInputData,
  validation,
} from "../store/features/component/ApplicationSlice";

const Application: FC<ApplicationProps> = ({ schemeId, navigate }) => {
  const dispatch = useAppDispatch();
  let value = useAppSelector((state) => state.application.value);
  let errors = useAppSelector((state) => state.application.errors);
  let [imageFile, setImageFile] = useState<File | "">("");
  let imagePreview = useAppSelector((state) => state.application.imagePreview);

  let setFormData = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.type === "file") {
      const file =
        event.target.files && event.target.files.length > 0
          ? event.target.files[0]
          : "";
      setImageFile(file);
      const imageValue =
        event.target.files && event.target.files.length > 0
          ? event.target.files[0].name
          : "";
      dispatch(setInputData({ name: event.target.name, value: imageValue }));
    } else {
      dispatch(
        setInputData({ name: event.target.name, value: event.target.value })
      );
    }
  };

  let preventFormDefault = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    dispatch(validation({ data: value }));
    dispatch(applyScheme({ imageFile, id: schemeId, navigate }));
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="application"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Form onSubmit={preventFormDefault} encType="multipart/form-data">
          <TextInput
            typeValue={"number"}
            value={value.adhaar}
            name="adhaar"
            labelText={"Adhaar number"}
            outerLabel={"Adhaar Number"}
            setForm={setFormData}
            errors={errors.adhaar}
          />

          <TextInput
            typeValue={"number"}
            value={value.farmersId}
            name="farmersId"
            labelText={"Enter Unique farmers Id"}
            outerLabel={"Unique Framers Id"}
            setForm={setFormData}
            errors={errors.farmersId}
          />

          {imagePreview !== undefined ? <img src={imagePreview} /> : ""}

          <TextInput
            typeValue={"file"}
            name="image"
            outerLabel={"Enter passport size image"}
            setForm={setFormData}
            errors={errors.image}
          />

          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Form>
      </div>
    </ThemeProvider>
  );
};

export default Application;
