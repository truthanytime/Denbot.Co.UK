
import { Navigate } from "react-router-dom";
import BasePrincing from "./components/BasePrincing";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";

function Billing() {
  return (
    <Navigate to="/billing/princing" />
    // <DashboardLayout>
    //   <MDBox mt={0} mb={0} height="95vh">
    //     <BasePrincing />
    //   </MDBox>
    // </DashboardLayout>
  );
}

export default Billing;
