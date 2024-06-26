import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./style.scss";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Update from "./pages/Update";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Notes from "./pages/Notes";
import { useAuth } from "./context/AuthContext";
import NoteEdit from "./pages/NoteEdit"; // Import the NoteEdit component

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/user/speeches"
          element={
            <RequireAuth>
              <Notes/>
            </RequireAuth>
          }
        />

        <Route
          path="/noteEdit/:id"
          element={
            <RequireAuth>
              <NoteEdit />
            </RequireAuth>
          }
        />

        <Route
          path="/user/update"
          element={
            <RequireAuth>
              <Update />
            </RequireAuth>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Layout />
        </Router>
      </div>
    </div>
  );
}

export default App;
