import React from "react";

function Orb({ position, type }) {
  const color = type === "good" ? "lightblue" : "darkred";
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Orb;
