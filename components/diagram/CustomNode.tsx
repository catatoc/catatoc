// components/CustomNode.tsx
import React from "react"
import { Handle, NodeProps, Position } from "reactflow"

const CustomNode = ({ data }: NodeProps) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #777",
        backgroundColor: "#fff",
        boxShadow: "0 3px 5px rgba(0,0,0,0.15)",
        whiteSpace: "pre-line", // Permitir saltos de línea
      }}
    >
      <strong>{data.label}</strong>
      {data.description && (
        <div style={{ marginTop: "5px", fontSize: "12px", color: "#555" }}>
          {data.description}
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />
    </div>
  )
}

export default CustomNode
