import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Profile from "./components/Profile";
import NoAuth from "./components/NoAuth";
import Hub from "./components/Hub";
import Transactions from "./components/Transactions";
import Budget from "./components/Budget";
import EditTransaction from "./components/EditTransaction";
import CreateTransaction from "./components/CreateTransaction";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noauth" element={<NoAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/transaction/:transId" element={<EditTransaction />} />
        <Route path="/transaction/create" element={<CreateTransaction />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
