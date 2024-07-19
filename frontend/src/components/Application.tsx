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

const Application: FC<ApplicationProps> = ({ schemeId }) => {
  let navigate = useNavigate();

  let [value, setValue] = useState<value>({
    adhaar: "",
    farmersId: "",
    image: "",
  });

  let [image, setImage] = useState<File | null>(null);

  let [errors, setErrors] = useState<newError>({
    adhaar: { errMsg: "", valid: false },
    farmersId: { errMsg: "", valid: false },
  });

  let [imageErrors, setImageErrors] = useState<imageErrors>({
    errMsg: "",
    valid: false,
  });

  let setFormData = (event: ChangeEvent<HTMLInputElement>): void => {
    setErrors((prevErr) => {
      return { ...prevErr, [event.target.name]: { errMsg: "", valid: false } };
    });

    setValue((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  };

  let setImageData = (event: ChangeEvent<HTMLInputElement>): void => {
    setImageErrors({ errMsg: "", valid: false });
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  let validation = (newError: newError): void => {
    setErrors((prevErr) => {
      return { ...prevErr, newError };
    });
  };

  let preventFormDefault = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    let newErrors = validateForm(value, errors);
    validation(newErrors);
    const data = new FormData();
    if (image) {
      data.append("file", image);
    }
    data.append("upload_preset", "fu6t0ggw");
    let resu = await axios
      .post("https://api.cloudinary.com/v1_1/daawurvug/image/upload", data)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setImageErrors({ errMsg: "Please enter the image", valid: true });
        }
      });

    if (resu) {
      value.image = `${resu.data?.secure_url}`;
    }

    let res = await axios.post(`/api/schemes/${schemeId}/apply`, value);
    if (res.data === "notLogin") {
      toast.warn("You must be Logged in");
      navigate("/login");
    } else if (res.data.role === "notFarmer") {
      toast.error("Access denied");
      navigate(`/admin`);
    } else if (res.data === "alreadyApplied") {
      toast.warn(
        "You have already applied and the Application is under processing"
      );
      navigate(`/schemes/${schemeId}`);
    } else if (res.data === "applied") {
      toast.success("Applied successfully");
      navigate("/");
    }
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
            labelText={"Enter Unique farmers Id required"}
            outerLabel={"Unique Framers Id"}
            setForm={setFormData}
            errors={errors.farmersId}
          />

          <TextInput
            typeValue={"file"}
            name="image"
            outerLabel={"Enter passport size image"}
            setForm={setImageData}
            errors={imageErrors}
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
