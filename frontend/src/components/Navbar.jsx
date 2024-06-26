import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h2>Note Maker</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li></li>
          </ul>
          <Link
            to="/about"
            style={{ textDecoration: "none" }}
            className="me-3"
          >
            <span className="link">About</span>
          </Link>

          <div className="d-flex align-items-center">
            {currentUser ? (
              <>
                <Link
                  to="/user/dashboard"
                  style={{ textDecoration: "none" }}
                  className="me-3"
                >
                  <span className="link">Create</span>
                </Link>

                <Link
                  to="/user/speeches"
                  style={{ textDecoration: "none" }}
                  className="me-3"
                >
                  <span className="link">Notes</span>
                </Link>

                <Link
                  to="/user/update"
                  style={{ textDecoration: "none" }}
                  className="me-3"
                >
                  <span className="link">{currentUser?.User?.username}</span>
                </Link>

                <Link to="/login" style={{ textDecoration: "none" }}>
                  <span className="link" onClick={logout}>
                    Logout
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  className="me-3"
                >
                  <span className="link">Home</span>
                </Link>

                <Link to="/login" className="link">
                  <span className="link">Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
