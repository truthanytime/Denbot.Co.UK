import { Icon, Input, Card, } from '@mui/material';
import React, { memo, useState, useLayoutEffect, useRef } from "react";

import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { Handle, Position } from "reactflow";
import { uploadImageFile } from 'library/apis/upload';
import { uploadFile } from 'library/apis/s3Upload';

const onConnect = (params) => console.log("handle onConnect", params);

const TextInput = ({ text, setText }) => {
  return (
    <Input
      placeholder={'Please input description and upload the image'}
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
      rows={2}
    />
  );
}

function ImageNode({ id, data }) {

  const ref = useRef(null);

  const [text, setText] = useState(data?.text || '');

  const [file, setFile] = useState(null);
  const [imageUri, setImageUri] = useState(data?.uri || '');

  const [elementData, setElementData] = useState(data || {});

  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleSetText = value => {
    setText(value);
    data?.handle(id, { ...elementData, text: value });
    setElementData({ ...elementData, text: value });
  }

  const handleChange = async event => {
    const fileUploaded = event.target.files[0];
    const uri = window.URL.createObjectURL(fileUploaded);
    setFile(fileUploaded);
    try {
      const s3Url = await uploadFile(fileUploaded);
      setImageUri(s3Url)
      data?.handle(id, { ...elementData, uri: s3Url });
      setElementData({ ...elementData, uri: s3Url });
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    console.log('Image Component Width: ', ref.current.offsetWidth);
    console.log('Image Component Height: ', ref.current.offsetHeight);
  }, []);

  return (
    <Card ref={ref}>
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
          mt={-2}
          ml={-2}
        >
          <Icon fontSize="medium" color="inherit">{'message'}</Icon>
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
          <MDTypography ml={1} color="text">Image Node</MDTypography>
          <TextInput
            text={text}
            setText={handleSetText} />
          <MDButton
            variant="contained"
            color="warning"
            onClick={handleClick}
            style={{ margin: 5 }}>
            {!imageUri.length ? 'Load' : 'Update'}
          </MDButton>
          <input
            type="file"
            ref={hiddenFileInput}
            accept={"image/*"}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          {imageUri && (
            <img
              src={imageUri}
              alt="File"
              style={{ width: '300px', height: 'auto', borderRadius: 16 }}
            />
          )}
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

export default memo(ImageNode);
