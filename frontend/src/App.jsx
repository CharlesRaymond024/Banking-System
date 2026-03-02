// frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Layout from "./components/home/Layout";
import Login from "./components/auth/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
      
    </Routes>
  );
}

export default App;