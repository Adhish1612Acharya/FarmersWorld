import { FC, FormEvent } from "react";
import ProfileTextField from "./ProfileTextField";
import "../styles/Profile.css";
import { Form } from "react-router-dom";
import {
  profileFormDataProps,
  valueObj,
} from "../types/routesTypes/user/Profile";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ProfileForm: FC<profileFormDataProps> = ({
  profileData,
  error,
  handleInputChange,
  handleFormSubmit,
  submitLoad,
  passportPhotoPreview,
  email,
}) => {
  return (
    <div className="profile">
      <Form
        onSubmit={(event: FormEvent<HTMLFormElement>) =>
          handleFormSubmit(event)
        }
        style={{ width: "100%" }}
        encType="multipart/form-data"
      >
        <ProfileTextField
          type="text"
          label="Enter Your Name as in Adhaar"
          value={profileData?.name}
          error={error.name}
          handleChange={handleInputChange}
          name="name"
        />
        <ProfileTextField
          type="number"
          label="Enter your Adhaar No."
          value={profileData?.adhaarNo}
          error={error.adhaarNo}
          handleChange={handleInputChange}
          name="adhaarNo"
        />
        <ProfileTextField
          type="number"
          label="Enter your FUID No."
          value={profileData?.fuid}
          error={error.fuid}
          handleChange={handleInputChange}
          name="fuid"
        />
        {passportPhotoPreview ? (
          <img
            src={passportPhotoPreview}
            alt=""
            style={{ width: "100px", height: "100px ", marginTop: "1rem" }}
          />
        ) : null}

        <ProfileTextField
          type="file"
          helperText="Enter your passport size photo"
          // value={profileData.passportSizePhoto}
          error={error.passportSizePhoto}
          handleChange={handleInputChange}
          name="passportSizePhoto"
        />
        <ProfileTextField
          type="number"
          label="Enter your Phone No."
          value={profileData?.phoneContact}
          error={error.phoneContact}
          handleChange={handleInputChange}
          name="phoneContact"
        />

        {submitLoad ? (
          <LoadingButton
            size="small"
            loading={true}
            variant="contained"
            disabled
            style={{ margin: "1rem auto" }}
          >
            <span>disabled</span>
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            color="success"
            type={"submit"}
            style={{ margin: "1rem auto" }}
          >
            Save
          </Button>
        )}
      </Form>
    </div>
  );
};

export default ProfileForm;
