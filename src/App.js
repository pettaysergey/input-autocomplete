import React from "react";
import "./App.css";
import Input from "./Input";
import { data } from "./data";

function App() {
  return (
    <div className="App">
      <Input options={data} />
    </div>
  );
}

export default App;
