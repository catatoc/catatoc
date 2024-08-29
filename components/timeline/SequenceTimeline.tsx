"use client"

import React, { useCallback } from "react"
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow"

import "reactflow/dist/style.css"

// Ejemplo de nodos representando tareas en un cronograma
const initialNodes = [
  {
    id: "1",
    data: { label: "Grading & Utilities" },
    position: { x: 50, y: 0 },
    style: { width: 200, backgroundColor: "lightblue" },
  },
  {
    id: "2",
    data: { label: "Foundation Work" },
    position: { x: 300, y: 0 },
    style: { width: 200, backgroundColor: "lightblue" },
  },
  {
    id: "3",
    data: { label: "Masonry" },
    position: { x: 550, y: 100 },
    style: { width: 200, backgroundColor: "red" },
  },
  {
    id: "4",
    data: { label: "Roofing" },
    position: { x: 800, y: 100 },
    style: { width: 200, backgroundColor: "red" },
  },
  {
    id: "5",
    data: { label: "Electrical" },
    position: { x: 1050, y: 200 },
    style: { width: 200, backgroundColor: "orange" },
  },
]

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
  { id: "e2-3", source: "2", target: "3", type: "smoothstep" },
  { id: "e3-4", source: "3", target: "4", type: "smoothstep" },
  { id: "e4-5", source: "4", target: "5", type: "smoothstep" },
]

function GanttDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    []
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      style={{ width: "100%", height: "500px" }}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  )
}

export default GanttDiagram
