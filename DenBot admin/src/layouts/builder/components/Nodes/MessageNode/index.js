import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { Box, Button, IconButton, Icon, TextField, Input, Card, Divider, colorManipulator } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from "react";

import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { Handle, Position } from "reactflow";

const onConnect = (params) => console.log("handle onConnect", params);

const TextInput = ({ text, setText }) => {
  return (
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
        width: '300px'
      }}
      autoFocus
      disableUnderline
      multiline
      rows={3}
    />
  );
}

function MessageNode({ id, data }) {

  const [text, setText] = useState(data?.text || '');

  useEffect(() => {
    data.handle && data.handle(id, { ...data, text: text })
  }, [text]);

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
          <Icon fontSize="medium" color="inherit">{'message'}</Icon>
          <MDTypography sx={{fontSize: '10px', height: '10px'}} color="text">{id}</MDTypography>
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
          <MDTypography ml={1} color="text">MessageNode</MDTypography>
          <TextInput
            text={text}
            setText={setText} />
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

export default memo(MessageNode);
