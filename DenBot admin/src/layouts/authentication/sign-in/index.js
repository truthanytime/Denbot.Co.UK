/**
=========================================================
* Denbot Admin - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Denbot Admin components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

import Slide from '@mui/material/Slide';

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { loginApi } from 'library/apis/login'

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const openAlert = () => setAlert(true);
  const closeAlert = () => setAlert(false);

  function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
  }

  const renderAlert = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="SignIn Error"
      content="Something else, please try again."
      open={alert}
      TransitionComponent={TransitionRight}
      onClose={closeAlert}
      close={closeAlert}
      bgWhite
    />
  )

  const handleSignIn = async () => {
    console.log("userData: ", userData);
    try {
      const result = await loginApi(userData);
      navigate('/nodes');
      console.log('singin result: ', result);
      localStorage.setItem("login user", JSON.stringify(result));
    } catch (error) {
      console.log(error);
      openAlert();
    }
  };

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            Sign in
          </MDTypography>
          {renderAlert}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth onChange={(event) => {
                setUserData({ ...userData, email: event.target.value });
              }} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth onChange={(event) => {
                setUserData({ ...userData, password: event.target.value });
              }} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
