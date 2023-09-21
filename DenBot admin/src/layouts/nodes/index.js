import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import Grid from "@mui/material/Grid";
import { Icon, Card, Divider, IconButton } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Slide from '@mui/material/Slide';
import { styled } from "@mui/material/styles";

// Denbot Admin components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

// Denbot Admin example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { getSessionsApi, deleteSessionApi, createSessionApi } from 'library/apis/session';
import CustomizedMenus from './components/menu';
import CreateModal from './components/createModal';
// import ZapierTextInput from './components/ZapierTextInput';

import { API_URL } from 'library/constant';
import { updateSessionApi } from 'library/apis/session';

const ClickableCard = styled(Card)`
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.5);
  }
`;

const SessionCard = ({ item, fetchData, handleNotification }) => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate('/builder', { state: { item: item } });
  }

  const [openModal, setOpenModal] = useState(false);

  const actionEdit = () => {
    setOpenModal(true);
  }

  const actionTest = () => {
    const color = item.color ? item.color : '#FF6900';
    const bubbleColor = item.bubbleColor ? item.bubbleColor : color;
    const chatBackColor = item.chatBackColor ? item.chatBackColor : '#FFFFFF';
    // navigate(`/test/${item._id}?color=${color.substring(1)}${item?.isBubbleEnabled ? '&bubbleText=' + item?.bubbleText + '&bubbleColor=' + bubbleColor.substring(1) : ''}&isLeft=${item?.isLeft ? 'true' : 'false'}&isAuto=${item?.isAuto ? 'true' : 'false'}&isTransparent=${item?.isTransparent ? 'true' : 'false'}`);
    navigate(`/test/${item._id}?isTransparent=${item?.isTransparent ? 'true' : 'false'}&chatBackColor=${chatBackColor.substring(1)}&color=${color.substring(1)}${item?.isBubbleEnabled ? '&bubbleText=' + item?.bubbleText + '&bubbleColor=' + bubbleColor.substring(1) : ''}&isLeft=${item?.isLeft ? 'true' : 'false'}&isAuto=${item?.isAuto ? 'true' : 'false'}`);
  }

  const actionDuplicate = async () => {
    try {
      const data = { nodes: item.nodes, edges: item.edges, color: item.color, avatar: item.avatar, name: item.name }
      await createSessionApi(data);
      fetchData().catch(console.error);
    } catch (error) {
      console.log(error);
    }
  }

  const actionDelete = async () => {
    try {
      await deleteSessionApi(item._id);
      fetchData().catch(console.error);
    } catch (error) {
      console.log(error);
    }
  }

  const actionDisable = async () => {
    try {
      await updateSessionApi(item._id, { ...item, isDisable: !(item?.isDisable) })
      fetchData().catch(console.error);
    } catch (error) {
      console.log(error);
    }
  }

  const actionBackup = async () => {
    try {
      const options = {
        suggestedName: `denbot-backup-${item.name ? item.name : 'No Title'}.json`, // Set the initial file name
        types: [
          {
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] }, // Specify the file extension
          },
        ],
      };
      let handle = null;
      try {
        handle = await window.showSaveFilePicker(options);
      } catch (error) {
        return;
      }
      const writableStream = await handle.createWritable();
      await writableStream.write(JSON.stringify(item));
      await writableStream.close();
      toast.success('Your bot saved successfully', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast('Error saving text to file:');
      console.error('Error saving text to file:', error);
    }
  };

  const handleMenuAction = (id) => {
    if (id == 'edit') actionEdit()
    else if (id === 'test') actionTest()
    else if (id === 'filecopy') actionDuplicate()
    else if (id === 'delete') actionDelete()
    else if (id === 'disable') actionDisable()
    else if (id === 'backup') actionBackup()
  }

  const getText = () => {
    return `<script src="${API_URL}denbot.js" botId="${item._id}" button-color="${item.color ? item.color : '#FF6900'} bubble-text="${item?.bubbleText || ''}"></script>`;
  }

  return (
    <div>
      <ClickableCard onClick={handleNav} sx={{ backgroundColor: item?.isDisable ? '#ffffff22' : '' }}>
        <MDBox display="flex" justifyContent="space-between" pt={1} px={2} flexDirection="column">
          <MDBox display="flex" justifyContent="space-between">
            <MDBox
              variant="gradient"
              bgColor="dark"
              color="white"
              coloredShadow="dark"
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="4rem"
              height="4rem"
              mt={-3}
              ml={-1}
            >
              {!item?.avatar && <Icon fontSize="medium" color="inherit">message</Icon>}
              {item?.avatar && <MDBox width="4rem" height="4rem" component="img" src={item?.avatar} sx={{ borderRadius: 3, borderWidth: 2, borderColor: item?.color || '#FF6900' }} />}
            </MDBox>
            <CustomizedMenus handleMenuAction={handleMenuAction} isDisable={item?.isDisable || false} />
          </MDBox>
          <MDBox mt={1}>
            <MDTypography variant="h5" noWrap={true}>{item?.name || 'No title'}</MDTypography>
          </MDBox>
        </MDBox>
        <Divider />
        <MDBox mx={1} mb={1}>
          <MDBox display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <MDTypography
              variant="h5"
              fontWeight="bold"
              color="success"
            >
              {item?.nodes?.length || 0}
            </MDTypography>
            <MDTypography noWrap variant="button" color="text" display="inline-block" sx={{ flex: 1 }} />

            <IconButton onClick={(e) => e.stopPropagation()}>
              <CopyToClipboard text={getText()}>
                <Tooltip title="Copy this script code for the deploy.">
                  <Icon fontSize="small" sx={{ color: '#ffffff88' }}>copy</Icon>
                </Tooltip>
              </CopyToClipboard>
            </IconButton>
          </MDBox>
        </MDBox>
      </ClickableCard>
      <CreateModal item={item} open={openModal} setOpen={setOpenModal} fetchData={fetchData} />
    </div >
  );
}

function Nodes() {

  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [item, setItem] = useState([]);
  const [alert, setAlert] = useState(false);
  const openAlert = () => setAlert(true);
  const closeAlert = () => setAlert(false);

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
  }

  const fetchData = async () => {
    try {
      const data = await getSessionsApi();
      console.log(JSON.stringify(data.data));
      setItem(data.data);
    } catch (error) {
      console.log('Error');
    }
  }

  const handleAdd = () => {
    navigate('/builder');
  }

  const handleRestore = async () => {
    try {
      let fileHandle;

      const options = {
        types: [{
          description: 'JSON Files',
          accept: { 'application/json': ['.json'] }, // Specify the file extension
        },],
      };

      try { [fileHandle] = await window.showOpenFilePicker(options); } catch (error) { return; }

      const file = await fileHandle.getFile();
      const text = await file.text();
      const item = JSON.parse(text);
      const data = { nodes: item.nodes, edges: item.edges, color: item.color, avatar: item.avatar, name: item.name }
      await createSessionApi(data);
      fetchData().catch(console.error);
    } catch (error) {
      console.error('Error loading file:', error);
      toast.error('🦄 The bot loading error!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleNotification = state => {
    openAlert();
  }

  return (
    <DashboardLayout >
      <DashboardNavbar isMini />
      {/* <ZapierTextInput /> */}
      <MDButton
        variant="gradient"
        color="dark"
        sx={{ marginRight: 1 }}
        startIcon={<Icon>restore</Icon>}
        onClick={handleRestore}>Restore Bot</MDButton>
      <MDButton
        variant="gradient"
        color="dark"
        startIcon={<Icon>add</Icon>}
        onClick={handleAdd}>Create a bot</MDButton>
      <MDBox py={3}>
        <Grid container spacing={3}>
          {item.map((i) => (
            <Grid item xs={6} md={4} lg={2}>
              <SessionCard
                item={i}
                fetchData={fetchData}
                handleNotification={handleNotification}
              />
            </Grid>
          ))}
        </Grid>
      </MDBox>
      <CreateModal open={openCreateModal} setOpen={setOpenCreateModal} />
      <MDSnackbar
        color="success"
        icon="check"
        title="Script copy"
        content="Successfully copied script for the deploy."
        open={alert}
        TransitionComponent={TransitionRight}
        onClose={closeAlert}
        close={closeAlert}
        bgWhite
      />
    </DashboardLayout>
  );
}

export default Nodes;
