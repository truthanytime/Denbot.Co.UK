import { MouseEvent as ReactMouseEven, CSSProperties, useCallback, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  addEdge,
  SnapGrid,
  Connection,
  Edge,
  ReactFlowInstance,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Position,
  OnSelectionChangeParams,
  Controls,
  Background,
  ConnectionLineType,
  ConnectionMode,
  ReactFlowProvider,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "reactflow";
import useUndoable from "use-undoable";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import MultiSelectorNode from "../Nodes/MultiSelectorNode";
import ImageNode from "../Nodes/ImageNode";
import ConditionalNode from "../Nodes/ConditionalNode";
import StartNode from "../Nodes/StartNode";
import EndNode from "../Nodes/EndNode";
import MessageNode from "../Nodes/MessageNode";
import SendEmailNode from "../Nodes/EmailNode";
import GoogleAnalyticsNode from "../Nodes/GoogleAnalyticsNode";
import { NameInputNode, EmailInputNode, PhoneInputNode, TextInputNode } from "../Nodes/CustomNode";
import PlusNode from "../Nodes/PlusNode";

import PlusEdge from "../Edges/PlusEdge";

import NodeSelectorDialog from "../NodeSelectorDialog";

import { createSessionApi, updateSessionApi } from 'library/apis/session';

const onNodeDragStart = (_, node, nodes) => console.log("drag start", node, nodes);
const onNodeDrag = (_, node, nodes) => console.log("drag", node, nodes);
const onNodeDragStop = (_, node, nodes) => console.log("drag stop", node, nodes);
const onNodeDoubleClick = (_, node) => console.log("node double click", node);
const onPaneScroll = (event) => console.log("pane scroll", event);
const onPaneContextMenu = (event) => console.log("pane context menu", event);
const onSelectionDrag = (_, nodes) => console.log("selection drag", nodes);
const onSelectionDragStart = (_, nodes) => console.log("selection drag start", nodes);
const onSelectionDragStop = (_, nodes) => console.log("selection drag stop", nodes);
const onSelectionContextMenu = (event, nodes) => {
  event.preventDefault();
  console.log("selection context menu", nodes);
};
const onNodeClick = (_, node) => console.log("node click:", node);

const onSelectionChange = ({ nodes, edges }) => console.log("selection change", nodes, edges);
const onInit = (reactFlowInstance) => {
  console.log("pane ready:", reactFlowInstance);
};

const onMoveStart = (_, viewport) => console.log("zoom/move start", viewport);
const onMoveEnd = (_, viewport) => console.log("zoom/move end", viewport);
const onEdgeContextMenu = (_, edge) => console.log("edge context menu", edge);
const onEdgeMouseMove = (_, edge) => {
  // console.log("edge mouse move", edge)
};
const onEdgeMouseLeave = (_, edge) => console.log("edge mouse leave", edge);
const onEdgeDoubleClick = (_, edge) => console.log("edge double click", edge);

const onEdgesDelete = (edges) => console.log("edges delete", edges);
const onPaneMouseMove = (e) => console.log("pane move", e.clientX, e.clientY);

const SIZE = {
  imageNode: { width: 342, height: 159 },
  nameNode: { width: 342, height: 159 },
  textNode: { width: 342, height: 159 },
  emailNode: { width: 342, height: 159 },
  sendEmailNode: { width: 342, height: 159 },
  googleAnalyticsNode: { width: 342, height: 159 },
  phoneNode: { width: 342, height: 159 },
  imageNode: { width: 342, height: 159 },
  multiSelectorNode: { width: 342, height: 159 },
  conditionalNode: { width: 342, height: 159 },
  messageNode: { width: 342, height: 159 },
  startNode: { width: 342, height: 159 },
  endNode: { width: 342, height: 159 },
  plusNode: { width: 342, height: 159 },
}

const nodeTypes = {
  nameNode: NameInputNode,
  textNode: TextInputNode,
  emailNode: EmailInputNode,
  phoneNode: PhoneInputNode,
  sendEmailNode: SendEmailNode,
  googleAnalyticsNode: GoogleAnalyticsNode,
  imageNode: ImageNode,
  multiSelectorNode: MultiSelectorNode,
  conditionalNode: ConditionalNode,
  messageNode: MessageNode,
  startNode: StartNode,
  endNode: EndNode,
  plusNode: PlusNode,
};

const edgeTypes = {
  plusEdge: PlusEdge,
};

const connectionLineStyle = { stroke: "#ddd", animated: true };
const snapGrid = [25, 25];

const OverviewFlow = ({ item }) => {

  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(!item);
  const [selectedEdge, setSelectedEdge] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project, setCenter } = useReactFlow();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState({ x: 0, y: 0 });

  const isValidConnection = (connection) => {
    console.log("isValid Connection: ", connection);

    const connectedEdges = edges.filter((edge) => {
      if (edge.sourceHandle) return edge.source === connection.source && edge.sourceHandle === connection.sourceHandle;
      return edge.source === connection.source && connection.sourceHandle === 'a';
    });

    connectedEdges.length && console.log('ConnectedEdge: ', connectedEdges);
    return connection.source !== connection.target && !connectedEdges.length;

  };

  // Function to extract index number from node ID
  function getIndexFromNodeId(nodeId) {
    const index = nodeId.split('-')[1];
    return parseInt(index);
  }

  // const getId = () => `node-${nodes.length + 1}`;
  const getId = () => {
    let maxIndex = -1;
    for (const node of nodes) {
      const index = getIndexFromNodeId(node.id);
      if (index > maxIndex) {
        maxIndex = index;
      }
    }
    console.log('MaxIndex: ', maxIndex);
    return `node-${maxIndex + 1}`;
  };

  const getEdgeId = (startNode, endNode) => {
    const start = parseInt(startNode.match(/-(\d+)/)[1], 10);
    const end = parseInt(endNode.match(/-(\d+)/)[1], 10);
    return `edge-${start}-${end}`;
  }

  const onNodesDelete = (
    (deleted) => {
      updateNodeForDelete(deleted);
    });

  const updateNodeForDelete = (node) => {
    console.log('Node: ', node);
    setEdges(
      node.reduce((acc, node) => {
        const incomers = getIncomers(node, nodes, edges);
        const outgoers = getOutgoers(node, nodes, edges);
        const connectedEdges = getConnectedEdges([node], edges);
        const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

        console.log('Node_: ', node);
        console.log('Acc_: ', acc);
        console.log('Incomers: ', incomers);
        console.log('Outgoers: ', outgoers);
        console.log('ConnectedEdges: ', connectedEdges);
        console.log('RemainingEdges: ', remainingEdges);

        const createdEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({ id: getEdgeId(source, target), source, target, type: 'plusEdge', animated: true, data: { handle: handleClickOpen } }))
        );

        return [...remainingEdges, ...createdEdges];
      }, edges)
    );
  };

  const handleDeleteNode = (id) => {

    setNodes((prev) => {
      const deletedNode = prev.filter(node => id === node.id);
      console.log('Nodes: ', prev);
      console.log('Id: ', id);
      console.log('Deleted Node: ', deletedNode);

      setEdges((prevEdges) => {

        const incomers = getIncomers(deletedNode[0], prev, prevEdges);
        const outgoers = getOutgoers(deletedNode[0], prev, prevEdges);
        const connectedEdges = getConnectedEdges(deletedNode, prevEdges);
        const remainingEdges = prevEdges.filter((edge) => !connectedEdges.includes(edge));

        console.log('Nodes: ', prev);
        console.log('Edges: ', prevEdges);
        console.log('Incomers: ', incomers);
        console.log('Outgoers: ', outgoers);
        console.log('ConnectedEdges: ', connectedEdges);
        console.log('RemainingEdges: ', remainingEdges);

        const firstSourceEdge = connectedEdges.find(edge => edge.source === deletedNode[0]?.id);
        const firstTargetEdge = connectedEdges.find(edge => edge.target === deletedNode[0]?.id);

        console.log('firstSourceEdge: ', firstSourceEdge);
        console.log('firstTargetEdge: ', firstTargetEdge);

        const newEdge = {
          id: getEdgeId(firstSourceEdge.target, firstTargetEdge.source),
          target: firstSourceEdge.target,
          source: firstTargetEdge.source,
          sourceHandle: firstTargetEdge.sourceHandle,
          type: 'plusEdge',
          animated: true,
          data: { handle: handleClickOpen }
        }

        console.log('newEdge: ', newEdge);

        if (firstSourceEdge && firstTargetEdge) return remainingEdges.concat(newEdge);
        else return remainingEdges;

      })
      return prev.filter(n => n.id !== id)
    }
    );

  }

  const setData = (id, data) => {
    setNodes(prev => {
      console.log('PrevData>>>', prev);
      const index = prev.findIndex(item => item.id === id);
      const length = prev.length;
      return [...prev.slice(0, index), { ...prev[index], data: data }, ...prev.slice(index + 1, length)];
    })
  }

  useEffect(() => {
    if (item) {
      setIsCreate(false);
      const edges = item.edges.map(edge => {
        const data = { ...edge, data: { handle: handleClickOpen } };
        return data;
      });
      const nodes = item.nodes.map(node => {
        const data = { ...node, data: { ...node?.data, handle: setData, handleDelete: handleDeleteNode } };
        return data;
      });
      setEdges(edges);
      setNodes(nodes);
      setHistory([{ nodes: nodes, edges: edges }]);
    } else {
      const initialNodes = [
        {
          id: `node-${1}`,
          type: "startNode",
          toolbarPosition: Position.Top,
          position: { x: 0, y: -100 },
        },
        {
          id: `node-${2}`,
          type: "endNode",
          position: { x: 0, y: 500 },
        },
      ];
      const initialEdges = [
        {
          id: `edge-${1}-${2}`,
          source: `node-${1}`,
          target: `node-${2}`,
          type: "plusEdge",
          animated: true,
        },
      ];
      setIsCreate(true);
      setNodes(initialNodes);
      const edges = initialEdges.map(edge => {
        const data = { ...edge, data: { handle: handleClickOpen } };
        return data;
      });
      setEdges(edges);
      setHistory([{ nodes: initialNodes, edges: edges }]);

      console.log('-----------------------------------------');
    }

  }, []);

  const handleSave = async () => {
    console.log('Nodes: ', nodes);
    console.log('Edges: ', edges);

    const updatedEdges = edges.map((edge) => {
      const { data, ...rest } = edge;
      return rest;
    });

    const filteredEdges = updatedEdges.filter((edge) => {
      return nodes.some(node => node.id === edge.source) && nodes.some(node => node.id === edge.target)
    })

    console.log('Updated Edges: ', updatedEdges);
    console.log('Filtered Edges: ', filteredEdges);

    const data = {
      nodes: nodes,
      edges: filteredEdges,
    }

    if (isCreate) {
      try {
        const result = await createSessionApi(data);
        console.log(result);
        // handleNavBack();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await updateSessionApi(item._id, data);
        console.log(result);
        // handleNavBack();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const onEdgeMouseEnter = (_, edge) => {
    console.log('Selected Edge on MouseEnter: ', edge);

    setSelectedEdge(edge);
  };

  const handleClickOpen = (edge) => {

    if (!edge.target) {
      console.log('Delete Clicked!');
      setEdges(prev => {
        return prev.filter((e) => e.id !== edge.id);
      });
    } else {
      setSelectedValue('');
      console.log('Selected Edge on Open: ', edge);
      setSelectedEdge((prevEdge) => {
        const updateEdge = {
          ...prevEdge,
          sourceX: edge.sourceX,
          sourceY: edge.sourceY,
          targetX: edge.targetX,
          targetY: edge.targetY
        };
        console.log('Selected Edge on Open Updated: ', updateEdge);
        return updateEdge;
      });
      setOpenDialog(true);
    }
  };

  const handleClose = (value) => {
    setOpenDialog(false);
    console.log('Selected Edge on Close: ', selectedEdge);
    if (value.length) {

      const width = SIZE[value]?.width ? SIZE[value].width : 0;
      const height = SIZE[value]?.height ? SIZE[value].height : 0;

      const newNode = {
        id: getId(),
        position: { x: (selectedEdge.targetX + selectedEdge.sourceX) / 2 - width / 2, y: (selectedEdge.targetY + selectedEdge.sourceY) / 2 - height / 2 },
        type: value,
        data: { handle: setData, handleDelete: handleDeleteNode },
      };
      console.log('New Node===>', newNode);
      let newEdgeStart = {
        id: getEdgeId(selectedEdge.source, newNode.id),
        source: selectedEdge.source,
        target: newNode.id,
        type: "plusEdge",
        animated: true,
        data: { handle: handleClickOpen }
      };
      let newEdgeEnd = {
        id: getEdgeId(newNode.id, selectedEdge.target),
        source: newNode.id,
        target: selectedEdge.target,
        type: "plusEdge",
        animated: true,
        data: { handle: handleClickOpen }
      };

      if (selectedEdge.sourceHandle) newEdgeStart = { ...newEdgeStart, sourceHandle: selectedEdge.sourceHandle }
      if (selectedEdge.targetHandle) newEdgeEnd = { ...newEdgeEnd, targetHandle: selectedEdge.targetHandle }

      console.log('New Edge Start: ', newEdgeStart);
      console.log('New Edge End: ', newEdgeEnd);

      const updatedEdges = edges.filter((edge) => edge.id !== selectedEdge.id);
      updatedEdges.push(newEdgeStart, newEdgeEnd);
      console.log(updatedEdges);
      setNodes((nds) => nds.concat(newNode));
      setEdges(updatedEdges);
      setSelectedValue(value);
    }
  };

  const handleNavBack = () => {
    navigate(-1);
  }

  const onConnect = useCallback(
    (params) => {
      console.log('Connect Edge: ', params);
      const newEdge = { ...params, animated: true, type: "plusEdge", data: { handle: handleClickOpen } };
      console.log('New Edge: ', newEdge);
      setEdges((eds) => addEdge(newEdge, eds));
    }, [setEdges]
  );

  const onPaneClick = useCallback(
    (evt) => {
      setSelectedPosition({ x: evt.clientX - 330, y: evt.clientY - 110 });
    },
    [project, setNodes]
  );

  const handleKeyDown = useCallback((event) => {
    console.log('Key Pressed', event);
    // Handle key down event
    if (event.ctrlKey && (event.key === 'z' || event.key === 'Z')) {
      handleUndo();
      console.log(`Undo Pressed!`);
    } else if (event.ctrlKey && (event.key === 'y' || event.key === 'Y')) {
      handleRedo();
      console.log(`Redo Pressed!`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleUndo = () => {
    if (historyHandler <= 0) return;
    historyHandler > 0 && setHistoryHandler((historyHandler) => {
      console.log(history);
      console.log('Handler Id', historyHandler);
      history[historyHandler - 1]?.nodes && setNodes(history[historyHandler - 1].nodes);
      history[historyHandler - 1]?.edges && setEdges(history[historyHandler - 1].edges);
      return historyHandler - 1;
    });
  }

  const handleRedo = () => {
    if (historyHandler >= history.length - 1) return;
    historyHandler < history.length - 1 && setHistoryHandler((historyHandler) => {
      console.log(history);
      console.log('Handler Id', historyHandler);
      history[historyHandler + 1]?.nodes && setNodes(history[historyHandler + 1].nodes);
      history[historyHandler + 1]?.edges && setEdges(history[historyHandler + 1].edges);
      return historyHandler + 1;
    });
  }

  const [history, setHistory] = useState([]);
  const [isDrag, setIsDrag] = useState(false);
  const [historyHandler, setHistoryHandler] = useState(0);

  const onNodeDragStart = (_, node, nodes) => {
    console.log("drag start", node, nodes);
    setIsDrag(true);
  }
  const onNodeDrag = (_, node, nodes) => console.log("drag", node, nodes);
  const onNodeDragStop = (_, node) => {
    console.log("drag stop", node, nodes);
    handlePushHistory({ nodes: nodes, edges: edges })
    setIsDrag(false);
  }

  const handlePushHistory = (value) => {
    console.log('Added History: ', value);
    const temp = history.slice(0, historyHandler + 1);
    temp.push(value)
    setHistory(temp);
    setHistoryHandler(temp.length - 1);
    console.log('temp: ', temp);
    console.log('Update Handler: ', historyHandler);
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      onPaneScroll={onPaneScroll}
      onPaneContextMenu={onPaneContextMenu}
      onNodeDragStart={onNodeDragStart}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onNodeDoubleClick={onNodeDoubleClick}
      onSelectionDragStart={onSelectionDragStart}
      onSelectionDrag={onSelectionDrag}
      onSelectionDragStop={onSelectionDragStop}
      onSelectionContextMenu={onSelectionContextMenu}
      onSelectionChange={onSelectionChange}
      onMoveStart={onMoveStart}
      onMoveEnd={onMoveEnd}
      onInit={onInit}
      // connectionLineType={ConnectionLineType.SmoothStep}
      connectionLineStyle={connectionLineStyle}
      // connectionMode={ConnectionMode.Loose}
      snapToGrid
      snapGrid={snapGrid}
      onEdgeContextMenu={onEdgeContextMenu}
      onEdgeMouseEnter={onEdgeMouseEnter}
      onEdgeMouseMove={onEdgeMouseMove}
      onEdgeMouseLeave={onEdgeMouseLeave}
      onEdgeDoubleClick={onEdgeDoubleClick}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      // attributionPosition="top-right"
      maxZoom={5}
      onNodesDelete={onNodesDelete}
      // onEdgesDelete={onEdgesDelete}
      disableKeyboardA11y
      // onPaneMouseMove={onPaneMouseMove}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      isValidConnection={isValidConnection}
    >
      {/* <Controls /> */}
      <Background color="#aaa" gap={25} />
      <NodeSelectorDialog
        selectedValue={selectedValue}
        open={openDialog}
        onClose={handleClose}
      />
      <MDBox mt={0} mr={0} position="fixed" right={10} bottom={5} zIndex={10}>
        <MDButton variant="contained" color="secondary" onClick={handleNavBack} style={{ margin: 5 }}>{"Back"}</MDButton>
        <MDButton variant="contained" color="success" onClick={handleSave} style={{ margin: 5 }}>{item ? "Update" : "Save"}</MDButton>
      </MDBox>
      <MDBox mt={0} mr={0} position="fixed" right={10} top={5} zIndex={10}>
        <MDButton variant="contained" disabled={historyHandler >= history.length - 1} color="secondary" onClick={handleRedo} style={{ margin: 5 }}>{"Redo"}</MDButton>
        <MDButton variant="contained" disabled={historyHandler <= 0} color="warning" onClick={handleUndo} style={{ margin: 5 }}>{"Undo"}</MDButton>
      </MDBox>
    </ReactFlow>
  );
}

const WrappedFlow = ({ item }) => (
  <ReactFlowProvider>
    <OverviewFlow item={item} />
  </ReactFlowProvider>
);

export default WrappedFlow;
