import { useEffect, FC } from "react";
import NavBar from "../../components/NavBar";
import { CircularProgress, ThemeProvider } from "@mui/material";
import SchemeCard from "../../components/SchemeCard";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getSchemesData,
  handleFilterClick,
} from "../../store/features/farmer/HomeSlice";
import theme from "../../theme";
import FooterDiv from "../../components/FooterDiv";

const AdminHomePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let showComponent = useAppSelector((state) => state.home.showComponent);
  let schemes = useAppSelector((state) => state.home.schemes);
  let navLogin = useAppSelector((state) => state.home.navLogin);
  let filterLoad = useAppSelector((state) => state.home.filterLoad);
  let count = useAppSelector((state) => state.home.count);

  useEffect(() => {
    const storageData: string | null = localStorage.getItem("filter");
    let parsedData: string = storageData ? JSON.parse(storageData) : "";
    console.log(parsedData);
    if (parsedData) {
      dispatch(
        handleFilterClick({
          navigate,
          filter: parsedData,
        })
      );
    } else {
      dispatch(getSchemesData(navigate));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          <>
            <NavBar
              login={navLogin}
              homePage={true}
              admin={true}
              navigate={navigate}
            />
            {!filterLoad ? (
              <div
                style={{
                  height: "max-content",
                  width: "100%",
                  textAlign: "center",
                  marginTop: "8rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {schemes.map((scheme, index) => {
                  return (
                    <a
                      href={`/admin/schemes/${scheme._id}/applications`}
                      key={scheme._id}
                      style={{ textDecoration: "none" }}
                    >
                      <SchemeCard
                        key={scheme._id}
                        scheme={scheme}
                        home={false}
                        isApplication={false}
                        count={Array.isArray(count) ? count[index] : 0}
                        admin={true}
                      />
                    </a>
                  );
                })}
              </div>
            ) : (
              <CircularProgress />
            )}
            <FooterDiv />
          </>
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default AdminHomePage;
