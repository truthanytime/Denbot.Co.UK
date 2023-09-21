import React, { memo, useCallback } from "react";
import { Handle, Position, useOnViewportChange } from "reactflow";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";

function EndNode() {
  const onStart = useCallback((viewport) => console.log("onStart", viewport), []);
  const onChange = useCallback((viewport) => console.log("onChange", viewport), []);
  const onEnd = useCallback((viewport) => console.log("onEnd", viewport), []);

  useOnViewportChange({
    onStart,
    onChange,
    onEnd,
  });

  return (
    <Card>
      <MDBox mt={2} mb={2} display="flex" sx={{ width: 200, justifyContent: 'center' }}>
      <MDTypography opacity={0.4} sx={{ fontSize: '10px', height: '10px', position: 'absolute', bottom: '7px', right: '7px'}} color="success" >node-2</MDTypography>
        <MDTypography variant="body1" component="p" color="text" mx={3}>
          Action End
        </MDTypography>
      </MDBox>
      <Handle type="target" className="w-2 h-2 bg-blue-900" position={Position.Top} id="a" />
    </Card>
  );
}

export default memo(EndNode);
