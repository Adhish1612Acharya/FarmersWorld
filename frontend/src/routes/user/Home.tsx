import { FC, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import CircularProgress from "@mui/material/CircularProgress";
import SchemeCard from "../../components/SchemeCard";
import { useNavigate } from "react-router-dom";
import { server } from "../../serv";
import { schemeObj } from "../../types/routesTypes/user/Home";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getSchemesData } from "../../store/features/farmer/HomeSlice";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let showComponent = useAppSelector((state) => state.home.showComponent);
  let schemes = useAppSelector((state) => state.home.schemes);
  let navLogin = useAppSelector((state) => state.home.navLogin);
  let filterLoad = useAppSelector((state) => state.home.filterLoad);

  useEffect(() => {
    dispatch(getSchemesData(navigate));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {showComponent ? (
          <>
            <NavBar login={navLogin} homePage={true} admin={false} />
            <>
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
                  {schemes?.map((scheme: schemeObj) => {
                    return (
                      <a
                        href={`/schemes/${scheme._id}`}
                        key={scheme._id}
                        style={{ textDecoration: "none" }}
                      >
                        <SchemeCard
                          key={scheme._id}
                          scheme={scheme}
                          home={true}
                          isApplication={false}
                        />
                      </a>
                    );
                  })}
                </div>
              ) : (
                <CircularProgress />
              )}
            </>
          </>
        ) : (
          <CircularProgress />
        )}
      </>
    </ThemeProvider>
  );
};

export default Home;
