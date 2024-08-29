"use client"

import React, { useEffect, useRef, useState } from "react"
import dagre from "dagre"
import ReactFlow, { Background, Controls, Edge, MiniMap, Node } from "reactflow"

import CustomNode from "./CustomNode"
import "reactflow/dist/style.css"
import { EnterFullScreenIcon, ExitFullScreenIcon } from "@radix-ui/react-icons"

// Define los bordes
const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
  { id: "e1-3", source: "1", target: "3", type: "smoothstep" },
  { id: "e1-4", source: "1", target: "4", type: "smoothstep" },
  { id: "e1-5", source: "1", target: "5", type: "smoothstep" },
  { id: "e2-2a", source: "2", target: "2a", type: "smoothstep" },
  { id: "e2-2b", source: "2", target: "2b", type: "smoothstep" },
  { id: "e2-2c", source: "2", target: "2c", type: "smoothstep" },
  { id: "e4-4a", source: "4", target: "4a", type: "smoothstep" },
  { id: "e4-4b", source: "4", target: "4b", type: "smoothstep" },
  { id: "e5-5a", source: "5", target: "5a", type: "smoothstep" },
  { id: "e5-5b", source: "5", target: "5b", type: "smoothstep" },
]

// Define la función de layout
const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 172
const nodeHeight = 36

const layoutNodes = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({
    rankdir: "TB", // Layout de arriba hacia abajo
    ranksep: 100, // Separación vertical entre nodos
    nodesep: 100, // Separación horizontal entre nodos
  })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  return nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    }
    return node
  })
}

// Define los nodos y aplica el layout
const initialNodes: Node[] = layoutNodes(
  [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "Yo" }, type: "input" },
    {
      id: "2",
      position: { x: -200, y: 100 },
      data: { label: "Pasiones", description: "Lo que me apasiona" },
      type: "custom",
    },
    {
      id: "2a",
      position: { x: -300, y: 200 },
      data: { label: "Música", description: "Tocar la guitarra y piano" },
      type: "custom",
    },
    {
      id: "2b",
      position: { x: -200, y: 250 },
      data: { label: "Deportes", description: "Jugar fútbol y correr" },
      type: "custom",
    },
    {
      id: "2c",
      position: { x: -100, y: 200 },
      data: { label: "Ingeniería", description: "Desarrollo de software" },
      type: "custom",
    },
    {
      id: "3",
      position: { x: 200, y: 100 },
      data: { label: "Intereses", description: "Cosas que me interesan" },
      type: "custom",
    },
    {
      id: "4",
      position: { x: -200, y: 350 },
      data: { label: "Estudios", description: "Mi formación académica" },
      type: "custom",
    },
    {
      id: "4a",
      position: { x: -300, y: 450 },
      data: {
        label: "Ingeniería de Producción",
        description: "Graduado en 2015",
      },
      type: "custom",
    },
    {
      id: "4b",
      position: { x: -100, y: 450 },
      data: {
        label: "Ingeniería de Sistemas",
        description: "Graduado en 2018",
      },
      type: "custom",
    },
    {
      id: "5",
      position: { x: 200, y: 350 },
      data: { label: "Valores", description: "Principios y creencias" },
      type: "custom",
    },
    {
      id: "5a",
      position: { x: 100, y: 450 },
      data: { label: "Familia Unida", description: "El pilar de mi vida" },
      type: "custom",
    },
    {
      id: "5b",
      position: { x: 300, y: 450 },
      data: { label: "Venezuela", description: "Mi país de origen" },
      type: "custom",
    },
  ],
  initialEdges
)

// Define los tipos de nodos
const nodeTypes = {
  custom: CustomNode, // Asigna el tipo de nodo personalizado
}

const MyDiagram: React.FC = () => {
  const diagramRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (diagramRef.current) {
        diagramRef.current.requestFullscreen()
        diagramRef.current.classList.add("fullscreen")
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        if (diagramRef.current) {
          diagramRef.current.classList.remove("fullscreen")
          setIsFullscreen(false)
        }
      }
    }
  }

  // Escucha el evento de la tecla "Esc" para salir de pantalla completa
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        toggleFullscreen()
      }
    }

    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [isFullscreen])

  return (
    <div ref={diagramRef} className="size-full">
      <button onClick={toggleFullscreen} style={{ marginBottom: "10px" }}>
        {isFullscreen ? (
          <ExitFullScreenIcon className="size-4" />
        ) : (
          <EnterFullScreenIcon className="size-4" />
        )}
      </button>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  )
}

export default MyDiagram
