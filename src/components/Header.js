import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css"; // ✅ Ensure CSS is properly linked

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="main-header">
      {" "}
      {/* ✅ Apply custom styling */}
      <Container fluid>
        <Navbar expand={false} className="w-100">
          {" "}
          {/* ✅ Ensures full width */}
          <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
            <img
              src="https://www.tennisogpadel.no/contentassets/b054f287ad8449fb96febd911aa647e3/02_ntpf_logo-rund_farger.png"
              alt="Logo"
              className="logo"
            />{" "}
            {/* ✅ Logo Styling */}
            <span class="brand-text">SPILLERGUIDEN</span>
          </Navbar.Brand>
          {/* ✅ Always show hamburger menu */}
          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setShowMenu(true)}
            className="text-white custom-hamburger"
          />
          {/* ✅ Offcanvas floating menu */}
          <Offcanvas
            show={showMenu}
            onHide={() => setShowMenu(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Navigasjon</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/" onClick={() => setShowMenu(false)}>
                  🏠 Hjem
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/levels"
                  onClick={() => setShowMenu(false)}
                >
                  🎾 Spillernivåer
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/technical-levels"
                  onClick={() => setShowMenu(false)}
                >
                  📊 Tekkniske nivåer
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/coach-report"
                  onClick={() => setShowMenu(false)}
                >
                  📝 Trener rapport
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
