import React, { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

function Player({ currentIsland, inclination, onFall, onItemCollected }) {
  const [position, setPosition] = useState([0, 0.55, 0]); // Positioned above the island surface
  const gravityEffect = 0.03; // Gravity effect
  const resistance = 0.01; // Resistance factor to keep the ball on the island

  // Handles movement and inclination sliding
  const handleKeyDown = (e) => {
    let [x, y, z] = position;
    const speed = 0.05;

    // ZQSD controls for movement with resistance
    if (e.key === "z") z -= speed * resistance;
    if (e.key === "s") z += speed * resistance;
    if (e.key === "q") x -= speed * resistance;
    if (e.key === "d") x += speed * resistance;

    setPosition([x, y, z]);
  };

  // Apply island tilt/gravity to the player's position
  useFrame(() => {
    let [x, , z] = position;

    // Gravity pulls the ball toward the incline
    x += inclination[0] * gravityEffect;
    z += inclination[1] * gravityEffect;

    setPosition([x, position[1], z]);

    // Check if player has fallen off the island
    if (Math.abs(x - currentIsland[0]) > 5 || Math.abs(z - currentIsland[2]) > 5) {
      onFall(); // Trigger game-over sequence
    }
  });

  // Detect collision with items on the island and remove item if collected
  useEffect(() => {
    currentIsland.items.forEach((item) => {
      const distance = Math.sqrt(
        (position[0] - item.position[0]) ** 2 +
        (position[1] - item.position[1]) ** 2 +
        (position[2] - item.position[2]) ** 2
      );
      if (distance < 0.5) {
        onItemCollected(item.id); // Remove item from island and update inclination
      }
    });
  }, [position, currentIsland, onItemCollected]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position, inclination]);

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  );
}

export default Player;
