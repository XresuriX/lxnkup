"use client"

import { Client } from "colyseus.js";

import BabylonScene from "./components/scene";

export default function Home() {
  const connectToServer = async () => {
    const client = new Client("ws://localhost:3001");
    const room = await client.joinOrCreate("my_room");
    console.log("Joined room:", room);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <BabylonScene />
      <h1>Next.js + Colyseus</h1>
      <button onClick={connectToServer}>Connect to Colyseus</button>
    </div>
  );
}
