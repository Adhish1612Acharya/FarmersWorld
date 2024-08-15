import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box, Container, CssBaseline, Paper, Typography } from "@mui/material";

const ProfileBanner: React.FC = () => {
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          marginTop: "64px",
          marginRight: "0px !important",
          marginLeft: "0px !important",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundImage: `url(https://nexusbase.io/wp-content/uploads/2022/09/farmers-world-featured-image.png)`,
        }}
        style={{
          height: "60% !important",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                <p style={{ opacity: "0" }}>FarmersWprld</p>
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                style={{ opacity: "0" }}
                paragraph
              >
                We make your farming hassle-free
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ProfileBanner;
