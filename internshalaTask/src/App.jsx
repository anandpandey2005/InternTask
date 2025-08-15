import { useState } from "react";
import "./App.css";
import { Home } from "./handler";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-amber-50 pt-10">
        <Home />
      </div>
    </>
  );
}

export default App;
