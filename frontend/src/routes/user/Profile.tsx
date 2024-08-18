import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import "../../styles/Profile.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteProfilePhoto,
  editProfilePhoto,
  getProfileInfo,
  handleInputField,
  profileFileReader,
  setProfilePhotoPreview,
  updateProfile,
  validation,
} from "../../store/features/farmer/FarmerProfileSlice";
import ProfileBanner from "../../components/ProfileBanner";
import ProfileUsernameBox from "../../components/ProfileUsernameBox";
import ProfileInfoBox from "../../components/ProfileInfoBox";
import "../../styles/ProfileDetail.css";
import PhotoDialog from "../../components/PhotoDialog";
import FooterDiv from "../../components/FooterDiv";

const Profile: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showComponent = useAppSelector(
    (state) => state.farmerProfile.showComponent
  );
  const navLogin = useAppSelector((state) => state.farmerProfile.navLogin);
  const profileData = useAppSelector(
    (state) => state.farmerProfile.profileData
  );
  const error = useAppSelector((state) => state.farmerProfile.error);
  const editProfileLoad = useAppSelector(
    (state) => state.farmerProfile.editProfileLoad
  );
  const passportPhotoPreview = useAppSelector(
    (state) => state.farmerProfile.passportPhotoPreview
  );
  const email = useAppSelector((state) => state.farmerProfile.email);
  const edit = useAppSelector((state) => state.farmerProfile.edit);
  const dialogOpen = useAppSelector((state) => state.farmerProfile.dialogOpen);
  const dialogEdit = useAppSelector(
    (state) => state.farmerProfile.photoDialogEdit
  );
  const profilePhotoLink = useAppSelector(
    (state) => state.farmerProfile.profilePhoto
  );
  const saveProfilePhotoLoad = useAppSelector(
    (state) => state.farmerProfile.saveProfilePhotoLoad
  );
  const profilePhotoPreview = useAppSelector(
    (state) => state.farmerProfile.profilePhotoPreview
  );
  const deleteProfilePhotoLoad = useAppSelector(
    (state) => state.farmerProfile.deleteProfilePhotoLoad
  );

  const applicationStatNo = useAppSelector(
    (state) => state.farmerProfile.applicationStatNo
  );

  const logoutLoad = useAppSelector((state) => state.home.logoutLoad);

  let [passportSizePhoto, setPassportSizePhoto] = useState<string | File>("");
  let [profilePhoto, setProfilePhoto] = useState<string | File>("");

  const setTextField = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.name === "passportSizePhoto" ||
      event.target.name === "profilePhoto"
    ) {
      dispatch(profileFileReader(""));
      const file =
        event.target.files && event.target.files.length > 0
          ? event.target.files[0]
          : "";
      if (event.target.name === "passportSizePhoto") {
        setPassportSizePhoto(file);
      }
      const reader = new FileReader();
      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      }
      reader.onloadend = () => {
        dispatch(profileFileReader(String(reader.result)));
      };
      const imageValue =
        event.target.files && event.target.files.length > 0
          ? event.target.files[0].name
          : "";
      dispatch(
        handleInputField({ name: event.target.name, value: imageValue })
      );
    } else {
      dispatch(
        handleInputField({ name: event.target.name, value: event.target.value })
      );
    }
  };

  const setProfilePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : "";
    setProfilePhoto(file);
    if (file !== "") {
      const reader = new FileReader();
      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      }
      reader.onloadend = () => {
        dispatch(setProfilePhotoPreview(String(reader.result)));
      };
    }
  };

  useEffect(() => {
    dispatch(getProfileInfo(navigate));
  }, []);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(validation({ data: profileData }));
    const passportSizePhotoData =
      passportSizePhoto === "" ? passportPhotoPreview : passportSizePhoto;
    dispatch(
      updateProfile({
        navigate,
        profileData,
        passportSizePhoto: passportSizePhotoData,
        profilePhoto,
      })
    );
  };

  const handleProfilePhotoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let image = profilePhoto === "" ? profilePhotoLink : profilePhoto;
    dispatch(editProfilePhoto({ image, navigate }));
  };

  const deleteProfilePhotoFunction = () => {
    dispatch(deleteProfilePhoto(navigate));
  };

  return (
    <>
      {showComponent ? (
        !logoutLoad ? (
          <>
            <NavBar
              navigate={navigate}
              admin={false}
              login={navLogin}
              homePage={false}
            />
            <ProfileBanner />
            <Box className="profileDetail">
              <ProfileUsernameBox
                username={profileData.userAccountName}
                email={email}
                dispatch={dispatch}
                profilePhotoLink={profilePhotoLink}
                applicationStatNo={applicationStatNo}
              />
              <ProfileInfoBox
                edit={edit}
                profileData={profileData}
                error={error}
                setTextField={setTextField}
                handleFormSubmit={handleFormSubmit}
                editProfileLoad={editProfileLoad}
                passportPhotoPreview={passportPhotoPreview}
                email={email}
                dispatch={dispatch}
              />
            </Box>
            <PhotoDialog
              open={dialogOpen}
              editProfilePhoto={dialogEdit}
              dispatch={dispatch}
              photoLink={profilePhotoLink}
              handleSubmit={handleProfilePhotoSubmit}
              setHiddenInput={setProfilePhotoChange}
              photoPreview={profilePhotoPreview}
              saveProfilePhotoLoad={saveProfilePhotoLoad}
              deleteProfilePhotoLoad={deleteProfilePhotoLoad}
              deleteProfilePhoto={deleteProfilePhotoFunction}
            />
            <FooterDiv />
          </>
        ) : (
          <CircularProgress style={{ margin: "auto" }} />
        )
      ) : (
        <CircularProgress style={{ margin: "auto" }} />
      )}
    </>
  );
};

export default Profile;
