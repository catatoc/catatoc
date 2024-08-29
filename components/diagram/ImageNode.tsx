// components/ImageNode.tsx
import React from "react"
import { Handle, NodeProps, Position } from "reactflow"

const ImageNode = ({ data }: NodeProps) => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={data.image}
        alt="Profile"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%", // Imagen redondeada (rounded-full)
          objectFit: "cover",
          border: "2px solid #555", // Agrega un borde si lo deseas
        }}
      />
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

export default ImageNode
