"use client";

import { useBearCreator } from "@/stores/counter";



export default function Settings() {

    const { bears } = useBearCreator();


  return (
    <div style={{ padding: 20 }}>

        <h1>Settings Page</h1>
        <p>Number of bears from store: <strong>{bears}</strong></p>
    </div>
  );
}