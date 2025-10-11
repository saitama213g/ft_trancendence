"use client"
import { useBearCreator } from "@/stores/counter";
import React, { useEffect } from "react";
import Settings from "../settings/page";

const BearCounter: React.FC = () => {
  const { bears, increasePopulation, removeAllBears, updateBears } = useBearCreator();
  const [input, setInput] = React.useState(bears);



  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Bear Counter</h1>
      <p>Number of bears: <strong>{bears}</strong></p>
      <button onClick={increasePopulation}>Increase Population</button>{" "}
      <button onClick={removeAllBears} style={{ marginLeft: 8 }}>Remove All Bears</button>
      <div style={{ marginTop: 16 }}>
        <input
          type="number"
          value={bears}
          onChange={(e) => setInput(Number(e.target.value))}
          style={{ width: 60, marginRight: 8 }}
        />
        <button onClick={() => updateBears(input)}>Set Bear Count</button>
      </div>
      < Settings />

    </div>
  );
};

export default BearCounter;