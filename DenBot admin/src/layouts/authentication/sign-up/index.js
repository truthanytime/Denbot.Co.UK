
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Slide from '@mui/material/Slide';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import { createUserApi } from 'library/apis/user';
import { loginApi } from 'library/apis/login';

const Cover = () => {
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const openAlert = (error) => {
    setError(error.toString());
    setAlert(true);
  }
  const closeAlert = () => setAlert(false);

  const handleSignUp = async () => {
    console.log("userData: ", userData);
    try {
      const createResult = await createUserApi(userData);
      const loginResult = await loginApi({email: userData.email, password: userData.password});
      localStorage.setItem("login user", JSON.stringify(loginResult));
      navigate('/nodes');
    } catch (error) {
      console.log(error);
      openAlert(error);
    }
  };

  function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
  }

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  })

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            Join us today
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth onChange={(event) => {
                setUserData({ ...userData, name: event.target.value });
              }} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={(event) => {
                setUserData({ ...userData, email: event.target.value });
              }} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth onChange={(event) => {
                setUserData({ ...userData, password: event.target.value });
              }} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignUp}>
                Create
              </MDButton>
              <MDSnackbar
                color="error"
                icon="warning"
                title="Register Error"
                content={error}
                open={alert}
                TransitionComponent={TransitionRight}
                onClose={closeAlert}
                close={closeAlert}
                bgWhite
              />
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
