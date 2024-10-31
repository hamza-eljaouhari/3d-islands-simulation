import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import Player from "./Player";
import Island from "./Island";

function GameCanvas() {
  const [score, setScore] = useState(0);
  const [currentIsland, setCurrentIsland] = useState({
    position: [0, 0, 0],
    items: [] // Ensure items is initialized as an empty array
  });
  const [inclination, setInclination] = useState([0, 0]);
  const [gameOver, setGameOver] = useState(false);

  // Calculate inclination based on island items
  const calculateInclination = (items = []) => { // Default to an empty array if items is undefined
    let xIncline = 0;
    let zIncline = 0;
    
    items.forEach((item) => {
      const weightEffect = item.type === "red" ? 0.05 : -0.05; // Red adds weight, green lifts weight
      xIncline += weightEffect * (item.position[0] / 5);
      zIncline += weightEffect * (item.position[2] / 5);
    });

    return [xIncline, zIncline];
  };

  // Update inclination and remove item when the blue ball touches it
  const handleItemCollected = (itemId) => {
    const updatedItems = currentIsland.items.filter((item) => item.id !== itemId);
    setCurrentIsland((prev) => ({
      ...prev,
      items: updatedItems
    }));
    setInclination(calculateInclination(updatedItems)); // Recalculate inclination
  };

  const handleBalance = () => {
    setScore(score + 1);
    setInclination([0, 0]); // Reset inclination on balance
    // Move to next random island here
  };

  const handleFall = () => {
    setGameOver(true);
  };

  if (gameOver) return <h1>Game Over! Final Score: {score}</h1>;

  return (
    <>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <Player
          currentIsland={currentIsland}
          inclination={inclination}
          onFall={handleFall}
          onItemCollected={handleItemCollected}
        />
        <Island
          position={currentIsland.position}
          onBalance={handleBalance}
        />
      </Canvas>
      <div style={{ position: "absolute", top: 10, left: 10, color: "white" }}>
        <h2>Score: {score}</h2>
      </div>
    </>
  );
}

export default GameCanvas;
