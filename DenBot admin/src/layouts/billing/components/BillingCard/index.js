import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

function BillingCard({ isActive = false, type = 'free' }) {

  const navigate = useNavigate();

  const handleSubscribe = (index) => {
    navigate('/billing/stripe', { state: { method: index } });
  }

  const FreeCard = () => <Card sx={{ backgroundColor: '#CC3463', minHeight: '400px' }}>
    <MDBox p={2}>
      <MDTypography variant="h3" fontWeight="medium" textTransform="capitalize">
        Free ( 0$ )
      </MDTypography>
    </MDBox>
    <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
      <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
        account
      </MDTypography>

      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            - Creating Bot flow
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            - Testing Bot flow
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            - Sample Bot template
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  </Card>

  const MonthlyCard = () => <Card sx={{ backgroundColor: '#33CD5F', minHeight: '400px' }}>
    <MDBox p={2}>
      <MDTypography variant="h3" fontWeight="medium" textTransform="capitalize">
        Monthly ( 20$ )
      </MDTypography>
    </MDBox>
    <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
      <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
        account
      </MDTypography>

      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            - Creating Bot flow
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            - Testing Bot flow
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            - Sample Bot template
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mt={3}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          Subcrtiption
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            Deploy projects
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            Monthly product updates
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
    <MDBox p={2} display="flex" justifyContent="center" alignItems="flex-end" sx={{ flex: 1 }}>
      {!isActive && <MDButton variant="gradient" color="info" display="flex" width="100%" onClick={() => handleSubscribe('montly')}>
        Subscribe
      </MDButton>}
      {isActive && (
        <MDTypography variant="h5" fontWeight="medium">Active</MDTypography>
      )}
    </MDBox>
  </Card>

  const AnnuallyCard = () => <Card sx={{ backgroundColor: '#cccc33', minHeight: '400px' }}>
    <MDBox p={2}>
      <MDTypography variant="h3" fontWeight="medium" textTransform="capitalize">
        Annually ( 200$ )
      </MDTypography>
    </MDBox>
    <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
      <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
        account
      </MDTypography>

      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            - Creating Bot flow
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            - Testing Bot flow
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            - Sample Bot template
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mt={3}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          Subcrtiption
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            Deploy projects
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5}>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            Monthly product updates
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
    <MDBox p={2} display="flex" justifyContent="center" alignItems="flex-end" sx={{ flex: 1 }}>
      {!isActive && <MDButton variant="gradient" color="info" display="flex" width="100%" onClick={() => handleSubscribe('annually')}>
        Subscribe
      </MDButton>}
      {isActive && (
        <MDTypography variant="h5" fontWeight="medium">Active</MDTypography>
      )}
    </MDBox>
  </Card>

  return (
    <>
      {type === 'free' && <FreeCard />}
      {type === 'monthly' && <MonthlyCard />}
      {type === 'annually' && <AnnuallyCard />}
    </>
  );
}

export default BillingCard;
