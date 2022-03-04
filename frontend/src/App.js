import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
