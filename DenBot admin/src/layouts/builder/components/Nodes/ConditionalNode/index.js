import { Icon, Input, Card } from '@mui/material';
import { memo, useEffect, useState } from "react";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { Handle, Position } from "reactflow";

const onConnect = (params) => console.log("handle onConnect", params);

const TextInput = ({ handleId, value, setValue }) => {
  return (
    <Input
      placeholder={'Input text'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      startAdornment={
        <Icon sx={{ ml: 1, mr: 1 }} fontSize="small" color="action">message</Icon>
      }
      endAdornment={
        <Handle
          type="source"
          className="w-3 h-3 bg-blue-900"
          position={Position.Right}
          id={handleId}
        />
      }
      style={{
        background: 'white', borderRadius: 8, borderColor: 'red', borderWidth: '0', margin: 5, padding: 5, width: '300px'
      }}
      autoFocus
      disableUnderline
      multiline
      maxRows={10}
    />
  );
}

function ConditionalNode({ id, data }) {

  const [text1, setText1] = useState(data?.texts && data?.texts[0] || '');
  const [text2, setText2] = useState(data?.texts && data?.texts[1] || '');

  const inputs = [
    <TextInput key={0} handleId={`handle-0`} value={text1} setValue={setText1} />,
    <TextInput key={1} handleId={`handle-1`} value={text2} setValue={setText2} />
  ];

  useEffect(() => {
    console.log('Text1: ', text1);
    console.log('Text2: ', text2);
    data.handle && data.handle(id, { ...data, texts: [text1, text2] });
  }, [text1, text2]);

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
          <Icon fontSize="medium" color="inherit">{'dns'}</Icon>
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
        <MDBox lineHeight={1} display="flex" sx={{ flexDirection: 'column' }}>
          <MDTypography ml={1} color="text">ConditionalNode</MDTypography>
          {inputs.map((input) => (input))}
        </MDBox>
      </MDBox>
      <Handle
        type="target"
        className="w-2 h-2 bg-cyan-500"
        position={Position.Top}
        onConnect={onConnect}
      />
    </Card>

  );
}

export default memo(ConditionalNode);
