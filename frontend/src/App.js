// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import ImageUpload from "./ImageUpload";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Imaginalry</h1>
        <ImageUpload />
      </header>
    </div>
  );
}
export default App;
