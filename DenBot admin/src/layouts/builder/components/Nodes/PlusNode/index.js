import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import React, { memo, useCallback } from "react";
import { Handle, Position, useOnViewportChange } from "reactflow";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { IconButton, Icon } from "@mui/material";

function PlueNode() {
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
      <IconButton mt={2} mb={2} display="flex" sx={{ width: 200 }}>
        <Icon fontSize="large" color="success">
          {'add'}
        </Icon>
      </IconButton>
      <Handle type="target" className="w-2 h-2 bg-blue-900" position={Position.Top} id="a" />
      <Handle type="source" className="w-2 h-2 bg-blue-900" position={Position.Bottom} id="b" />
    </Card>
  );
}

export default memo(PlueNode);
