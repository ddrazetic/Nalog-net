import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./styles/style.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "./services/auth.service";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/authorization/login";
import Register from "./components/authorization/register";
import Home from "./components/shared/home";
import Profile from "./components/shared/profile";
import BoardUser from "./components/user/board-user";
import BoardModerator from "./components/moderator/board-moderator";
import BoardAdmin from "./components/admin/board-admin";
import SuperAdmin from "./components/super_admin/SuperAdmin";
import EventBus from "./common/EventBus";
import { ToastContainer } from "react-toastify";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [showModeratorBoard, setShowModeratorBoard] = useState();
  const [showUserBoard, setShowUserBoard] = useState();
  const [showAdminBoard, setShowAdminBoard] = useState();
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowUserBoard(user.roles.includes("ROLE_USER"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, []);
  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setShowUserBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <div>
      <Switch>
        <Route path="/superadmin">
          <SuperAdmin />
        </Route>
        <Route path="/">
          <>
            <Navbar
              className="navShadow"
              style={{
                backgroundColor: "white",
              }}
              expand="sm"
            >
              <Container>
                <Navbar.Brand className="navTitle">Nalog-net</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="navLinks" id="basic-navbar-nav ">
                  <Nav className="me-auto ">
                    <NavLink
                      exact
                      to={"/"}
                      className="nav-link"
                      activeClassName="nav_link--active"
                    >
                      Naslovnica
                    </NavLink>

                    {showModeratorBoard && (
                      <NavLink
                        to={"/mod"}
                        className="nav-link"
                        activeClassName="nav_link--active"
                      >
                        Voditelj
                      </NavLink>
                    )}

                    {showAdminBoard && (
                      <NavLink
                        to={"/admin"}
                        activeClassName="nav_link--active"
                        className="nav-link"
                      >
                        Direktor
                      </NavLink>
                    )}

                    {showUserBoard && (
                      <NavLink
                        to={"/user"}
                        className="nav-link"
                        activeClassName="nav_link--active"
                      >
                        Korisnik
                      </NavLink>
                    )}
                  </Nav>

                  {currentUser ? (
                    <Nav className="ml-auto">
                      <NavLink
                        to={"/profile"}
                        className="nav-link"
                        activeClassName="nav_link--active"
                      >
                        {currentUser.username}
                      </NavLink>

                      <a href="/login" className="nav-link" onClick={logOut}>
                        Odjava
                      </a>
                    </Nav>
                  ) : (
                    <Nav className="ml-auto">
                      <NavLink
                        to={"/login"}
                        className="nav-link"
                        activeClassName="nav_link--active"
                      >
                        Prijava
                      </NavLink>

                      <NavLink
                        to={"/register"}
                        className="nav-link"
                        activeClassName="nav_link--active"
                      >
                        Registracija
                      </NavLink>

                      {/* <NavLink to={"/superadmin"} className="nav-link">
                        Super admin
                      </NavLink> */}
                    </Nav>
                  )}
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <div className="">
              <Switch>
                <Route exact path={["/"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />

                <Route path="/user">
                  {currentUser && <BoardUser currentUser={currentUser} />}
                </Route>
                <Route path="/mod">
                  {currentUser && <BoardModerator currentUser={currentUser} />}
                </Route>
                <Route path="/admin">
                  {currentUser && <BoardAdmin currentUser={currentUser} />}
                </Route>
              </Switch>
              <ToastContainer
                position="bottom-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
