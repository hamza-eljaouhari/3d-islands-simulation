import React, { useState, useEffect } from "react";

function Island({ position, onBalance }) {
  const [inclination, setInclination] = useState([0, 0]); // Inclination on x and z axes
  const [items, setItems] = useState([]); // Array of red/green items
  const balanceThreshold = 1.5; // Maximum tilt before game over

  // Function to calculate inclination based on item types
  const calculateInclination = () => {
    let xIncline = 0;
    let zIncline = 0;
    items.forEach(item => {
      const weightEffect = item.type === "red" ? 0.05 : -0.05;
      xIncline += weightEffect * (item.position[0] / 5);
      zIncline += weightEffect * (item.position[2] / 5);
    });
    setInclination([xIncline, zIncline]);
  };

  // Spawn items with random locations on the island
  useEffect(() => {
    const spawnItems = () => {
      const type = Math.random() > 0.5 ? "red" : "green";
      const newItem = {
        type,
        id: Math.random(),
        position: [
          Math.random() * 4 - 2,
          0.5,
          Math.random() * 4 - 2
        ]
      };
      setItems((prev) => [...prev, newItem]);
      calculateInclination();
    };

    const interval = setInterval(spawnItems, 3000); // Spawn new items every 3 seconds
    return () => clearInterval(interval);
  }, [items]);

  // Remove item on collision with the blue ball
  const removeItem = (itemId) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    calculateInclination(); // Recalculate inclination after removing the item
  };

  return (
    <group position={position} rotation={[inclination[0], 0, inclination[1]]}>
      <mesh>
        <boxGeometry args={[5, 0.5, 5]} />
        <meshStandardMaterial color="green" />
      </mesh>
      {items.map((item) => (
        <mesh
          key={item.id}
          position={item.position}
          onClick={() => removeItem(item.id)} // Trigger removal on touch
        >
          <sphereGeometry args={[item.type === "red" ? 0.4 : 0.25, 16, 16]} />
          <meshStandardMaterial
            color={item.type === "red" ? "red" : "green"}
            wireframe={item.type === "green"} // Different visual effect for green balls
          />
        </mesh>
      ))}
    </group>
  );
}

export default Island;
