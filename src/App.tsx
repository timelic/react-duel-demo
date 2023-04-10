import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { animated, useSpring, useSpringRef } from "@react-spring/web";
import { Board } from "./Board";

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
