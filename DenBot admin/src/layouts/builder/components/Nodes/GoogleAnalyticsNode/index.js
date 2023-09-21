import { Box, Icon, Input, Card } from '@mui/material';
import  { memo, useEffect, useState } from "react";

import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { Handle, Position } from "reactflow";

const onConnect = (params) => console.log("handle onConnect", params);

const TextInput = ({ title, text, setText }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <MDTypography sx={{ fontSize: '12px', minWidth: '80px', textAlign: 'right' }} color="text">{title || '--'}</MDTypography>
      <Input
        placeholder={'Input text'}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          background: 'white',
          borderRadius: 8,
          borderColor: 'red',
          margin: 5,
          padding: 5,
          overflow: 'hidden',
          width: '200px'
        }}
        autoFocus
        disableUnderline
        multiline
        rows={1}
      />
    </Box>
  );
}

function GoogleAnalyticsNode({ id, data }) {

  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(data?.text || "{}");
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  });

  useEffect(() => {
    console.log('Value: ', value, JSON.stringify(value));
    data.handle && data.handle(id, { ...data, text: JSON.stringify(value) })
  }, [value]);

  return (
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
          flexDirection="column"
          width="3rem"
          height="3rem"
          mt={-2}
          ml={-2}
        >
          <Icon fontSize="medium" color="inherit">{'poll'}</Icon>
          <MDTypography sx={{ fontSize: '10px', height: '10px' }} color="text">{id}</MDTypography>
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
        <MDBox display="flex" sx={{ flexDirection: 'column' }}>
          <MDTypography ml={1} color="text">Google Analytics Node</MDTypography>
          <TextInput title="GTagID" text={value?.id} setText={(text) => { setValue({ ...value, id: text }) }} />
          <TextInput title="Category" text={value?.category} setText={(text) => { setValue({ ...value, category: text }) }} />
          <TextInput title="Action" text={value?.action} setText={(text) => { setValue({ ...value, action: text }) }} />
          <TextInput title="Label" text={value?.label} setText={(text) => { setValue({ ...value, label: text }) }} />
        </MDBox>
      </MDBox>
      <Handle
        type="target"
        className="w-3 h-3 bg-cyan-500"
        position={Position.Top}
        onConnect={onConnect}
      />
      <Handle
        type="source"
        className="w-3 h-3 bg-blue-900"
        position={Position.Bottom}
        id={'handle-0'}
      />
    </Card>

  );
}

export default memo(GoogleAnalyticsNode);
