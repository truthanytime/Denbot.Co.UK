import { memo } from "react";
import { Handle, Position } from "reactflow";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Tooltip from '@mui/material/Tooltip';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const onConnect = (params) => console.log("handle onConnect", params);

function CustomNode({ title, icon, placeHodler, id, data }) {

  return (
    <>
      <Card>
        <MDBox display="flex" py={1.2}>
          <MDBox
            variant="gradient"
            bgColor={'primary'}
            color={"white"}
            coloredShadow={'primary'}
            borderRadius="xl"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="3rem"
            height="3rem"
            flexDirection="column"
            mt={-2}
            ml={-2}
          >
            <Icon fontSize="medium" color="inherit">{icon}</Icon>
            <CopyToClipboard text={`{${id}}`}>
              <Tooltip enterDelay={300} title={'You can use this {id} to use this value on the other nodes.\n Format: {node-i} || {node-i.value} || {nodei} || {nodei.value}.'}>
                <MDTypography sx={{ fontSize: '10px', height: '10px' }} color="text">{id}</MDTypography>
              </Tooltip>
            </CopyToClipboard>
          </MDBox>
          <MDBox textAlign="right">
            <MDTypography ml={1} color="text">{title}</MDTypography>
          </MDBox>
          <MDBox
            variant="gradient"
            bgColor={'secondary'}
            color={"dark"}
            borderRadius="30px"
            display="flex"
            sx={{ position: "absolute", right: -15, top: -15 }}
            justifyContent="center"
            alignItems="center"
            width='30px'
            height='30px'
            onClick={() => {
              data?.handleDelete(id);
            }}
          >
            <Icon fontSize="medium" color="inherit">
              {'close'}
            </Icon>
          </MDBox>
        </MDBox>
        <Divider mt={-1} />
        <MDBox pb={2} px={2}>
          <MDTypography
            component="p"
            variant="button"
            fontWeight="bold"
            color="success"
          >
            {placeHodler}
          </MDTypography>
        </MDBox>
      </Card>
      <Handle
        type="target"
        className="w-2 h-2 bg-cyan-500"
        position={Position.Top}
        onConnect={onConnect}
      />
      <Handle
        type="source"
        className="left-2/4 w-2 h-2 bg-blue-900"
        position={Position.Bottom}
        id="a"
      />
    </>
  );
}

export const NameInputNode = ({ id, data }) =>
  <CustomNode
    title="Name Input Node"
    placeHodler="Please Input your name."
    icon="message"
    id={id}
    data={data}
  />

export const EmailInputNode = ({ id, data }) =>
  <CustomNode
    title="Email Input Node"
    placeHodler="Please Input your email address."
    icon="email"
    id={id}
    data={data}
  />

export const PhoneInputNode = ({ id, data }) =>
  <CustomNode
    title="Phone Input Node"
    placeHodler="Please Input your phone number."
    icon="phone"
    id={id}
    data={data}
  />

export const TextInputNode = ({ id, data }) =>
  <CustomNode
    title="Text Input Node"
    placeHodler="Please Input your question."
    icon="message"
    id={id}
    data={data}
  />


export default memo(CustomNode);
