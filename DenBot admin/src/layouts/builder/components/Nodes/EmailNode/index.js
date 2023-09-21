import { Box, Icon, Input, Card, IconButton } from '@mui/material';
import { memo, useEffect, useState } from "react";

import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { Handle, Position } from "reactflow";

const onConnect = (params) => console.log("handle onConnect", params);

const TextInput = ({ title, text, setText, setFields, id, onDelete }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Input
        value={title}
        onChange={(e) => setFields(e.target.value)}
        style={{
          background: 'white',
          borderRadius: 8,
          borderColor: 'red',
          margin: 5,
          padding: 5,
          overflow: 'hidden',
          textAlign: 'right',
          width: '150px'
        }}
        disableUnderline
        multiline
        rows={1}
      />
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
        disableUnderline
        multiline
        rows={1}
      />
      <MDBox
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
        mx={1}
      >
        <IconButton fontSize="small" color="inherit" onClick={() => onDelete(id)}>
          <Icon fontSize="small" color="inherit">
            {'remove'}
          </Icon>
        </IconButton>
      </MDBox>
    </Box>
  );
};

function EmailNode({ id, data }) {
  const [value, setValue] = useState(() => {
    let initialData = {
      zapierUrl: '',
      name: '',
      email: '',
      phone: '',
      interestedIn: '',
      requestType: '',
      practiceName: '',
      practiceEmail: ''
    }
    try {
      if (data?.text.length) initialData = JSON.parse(data?.text);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    return Object.keys(initialData).map(data => {
      return { id: data, text: initialData[data] };
    });
  });

  useEffect(() => {
    const json = {};
    value.forEach(element => {
      json[element.id] = element.text;
    });
    console.log('Value: ', json, JSON.stringify(json));
    data.handle && data.handle(id, { ...data, text: JSON.stringify(json) });
  }, [value]);

  const handleAddField = () => {
    const newField = {
      id: `Field${Object.keys(value).length + 1}`,
      deleted: false,
    };
    setValue((prevValue) => [...prevValue, { id: newField.id, text: '' }]);
  };

  const handleDeleteField = (fieldId) => {
    setValue((prevValue) => prevValue.filter(value => value.id != fieldId));
  };

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
          <MDTypography ml={1} color="text">EmailNode</MDTypography>

          {value.map((item) =>
            <TextInput
              key={item.id}
              id={item.id}
              title={item.id}
              text={item.text}
              setFields={(text) => {
                setValue((prevValue) => {
                  console.log('PrevValue: ', prevValue);
                  return prevValue.map((value) => {
                    if (item.id == value.id) value.id = text
                    return value;
                  })
                });
              }}
              setText={(text) => {
                setValue((prevValue) => {
                  console.log('PrevValue: ', prevValue);
                  return prevValue.map((value) => {
                    if (item.id == value.id) value.text = text
                    return value;
                  })
                });
              }}
              onDelete={handleDeleteField}
            />
          )}

          <MDBox sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
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
              <IconButton fontSize="small" color="inherit" onClick={handleAddField}>
                <Icon fontSize="small" color="inherit">
                  {'add'}
                </Icon>
              </IconButton>
            </MDBox>
          </MDBox>

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

export default EmailNode;
