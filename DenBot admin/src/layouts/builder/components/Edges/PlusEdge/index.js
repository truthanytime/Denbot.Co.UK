import React from 'react';
import { getBezierPath, EdgeLabelRenderer } from 'reactflow';
import { Box, Button, IconButton, Icon, TextField, Input, Card, Divider, colorManipulator } from '@mui/material';

import './index.css';

const foreignObjectSize = 40;

const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
};

export default function PlusEdge({
    id,
    source,
    target,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    sourceHandle,
    targetHandle,
    style = {},
    markerEnd,
    data,
}) {
    const [edgePath, labelX, labelY,] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <EdgeLabelRenderer>
                <div style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    pointerEvents: 'all',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <button className="edgebutton" onClick={() => {
                        data?.handle({
                            id,
                            source,
                            target,
                            sourceX,
                            sourceY,
                            targetX,
                            targetY,
                            sourceHandle,
                            targetHandle,
                        });
                    }
                    }>
                        <Icon fontSize="small" sx={{ color: 'Highlight' }}>
                            {'add'}
                        </Icon>
                    </button>
                    <button className="removebutton" onClick={() => {
                        data?.handle({ id, });
                    }
                    }>
                        <Icon fontSize="small" sx={{ color: 'yellow' }}>
                            {'remove'}
                        </Icon>
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
