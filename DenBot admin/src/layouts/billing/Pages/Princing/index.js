
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import BillingCard from "layouts/billing/components/BillingCard";
import Header from "layouts/billing/components/Header";

function Princing() {

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <BillingCard isActive={true}/>
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <BillingCard type="monthly" />
            </Grid>
            <Grid item xs={12} xl={4}>
              <BillingCard type="annually" />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Princing;
