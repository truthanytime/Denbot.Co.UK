import { Box, Button, IconButton, Icon, TextField, Input, Card, Divider, colorManipulator } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from "react";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { Handle, Position, } from "reactflow";

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
        background: 'white',
        borderRadius: 8,
        borderColor: 'red',
        borderWidth: '0',
        margin: 5,
        padding: 5,
        width: '300px'
      }}
      autoFocus
      disableUnderline
      multiline
      maxRows={10}
    />
  );
}

function MultiSelectorNode({ id, data }) {

  const initialTexts = data?.texts?.length > 1 ? data?.texts : data?.texts?.length === 1 ? [...data?.texts, ''] : ['', ''];
  const [texts, setTexts] = useState(initialTexts);

  const handleAddHandle = () => {
    const addTexts = [...texts];
    addTexts.push('');
    console.log('AddTexts: ', addTexts);
    data?.handle(id, { ...data, texts: addTexts });
    setTexts(addTexts);
  };

  const handleDeleteHandle = () => {
    if (texts.length > 1) {
      const removeTexts = [...texts];
      removeTexts.pop();
      console.log('RemoveTexts: ', removeTexts);
      data?.handle(id, { ...data, texts: removeTexts });
      setTexts(removeTexts);
    }
  };

  const handleSetTexts = (value, index) => {
    setTexts((prevTexts) => {
      const updateTexts = prevTexts.map((prevText, textIndex) => {
        if (index === textIndex) return value;
        return prevText;
      });
      data?.handle(id, { ...data, texts: updateTexts });
      return updateTexts;
    });
  }

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
          <Icon fontSize="medium" color="inherit">{'toc'}</Icon>
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
          <MDTypography ml={1} color="text">MultiSelectorNode</MDTypography>
          {texts.map((text, index) => {
            return (
              <TextInput
                key={index}
                handleId={`handle-${index}`}
                value={text}
                setValue={(value) => handleSetTexts(value, index)}
              />
            )
          })}
        </MDBox>
      </MDBox>
      <Handle
        type="target"
        className="w-2 h-2 bg-cyan-500"
        position={Position.Top}
        onConnect={onConnect}
      />
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={-1}
        mb={1}
      >
        <MDBox
          variant="gradient"
          bgColor={'success'}
          color={"dark"}
          coloredShadow={'success'}
          borderRadius='30px'
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={'30px'}
          height={'30px'}
          mx={0.5}
        >
          <IconButton fontSize="small" color="inherit" onClick={handleAddHandle}>
            <Icon fontSize="small" color="inherit">
              {'add'}
            </Icon>
          </IconButton>
        </MDBox>
        {texts.length > 1 && <MDBox
          variant="gradient"
          bgColor={'warning'}
          color={"dark"}
          coloredShadow={'warning'}
          borderRadius='30px'
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={'30px'}
          height={'30px'}
          mx={0.5}
        >
          <IconButton fontSize="small" color="inherit" onClick={handleDeleteHandle}>
            <Icon fontSize="small" color="inherit">
              {'remove'}
            </Icon>
          </IconButton>
        </MDBox>}
      </MDBox>
    </Card>

  );
}

export default memo(MultiSelectorNode);
