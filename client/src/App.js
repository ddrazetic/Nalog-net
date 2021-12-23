import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import SuperAdmin from "./super_admin/SuperAdmin";
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showUserBoard: user.roles.includes("ROLE_USER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showUserBoard, showAdminBoard } =
      this.state;

    return (
      <div>
        <Switch>
          <Route path="/superadmin" component={SuperAdmin} />
          <Route
            path="/"
            render={() => (
              <>
                {/* <Navbar bg="light" expand="lg">
                  <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar> */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <Link to={"/"} className="navbar-brand">
                    Nalog-net
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                  >
                    <div className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                          Home
                        </Link>
                      </li>

                      {showModeratorBoard && (
                        <li className="nav-item">
                          <Link to={"/mod"} className="nav-link">
                            Moderator Board
                          </Link>
                        </li>
                      )}

                      {showAdminBoard && (
                        <li className="nav-item">
                          <Link to={"/admin"} className="nav-link">
                            Admin Board
                          </Link>
                        </li>
                      )}

                      {showUserBoard && (
                        <li className="nav-item">
                          <Link to={"/user"} className="nav-link">
                            User
                          </Link>
                        </li>
                      )}
                    </div>

                    {currentUser ? (
                      <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <Link to={"/profile"} className="nav-link">
                            {currentUser.username}
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a
                            href="/login"
                            className="nav-link"
                            onClick={this.logOut}
                          >
                            LogOut
                          </a>
                        </li>
                      </div>
                    ) : (
                      <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <Link to={"/login"} className="nav-link">
                            Login
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link to={"/register"} className="nav-link">
                            Sign Up
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={"/superadmin"} className="nav-link">
                            Super admin
                          </Link>
                        </li>
                      </div>
                    )}
                  </div>
                </nav>
                <div className="container mt-4">
                  <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />

                    <Route
                      path="/user"
                      component={showUserBoard && <BoardUser />}
                    />
                    <Route
                      path="/mod"
                      component={showModeratorBoard && BoardModerator}
                    />
                    <Route
                      path="/admin"
                      component={showAdminBoard && BoardAdmin}
                    />
                  </Switch>
                </div>
              </>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
