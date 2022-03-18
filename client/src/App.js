import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
// import "./App.css";
import "./styles/style.css";

import AuthService from "./services/auth.service";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
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
        {/* <Route path="/superadmin" component={SuperAdmin} /> */}
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
                      Home
                    </NavLink>

                    {showModeratorBoard && (
                      <NavLink
                        to={"/mod"}
                        className="nav-link"
                        activeClassName="nav_link--active"
                      >
                        Moderator Board
                      </NavLink>
                    )}

                    {showAdminBoard && (
                      <NavLink
                        to={"/admin"}
                        activeClassName="nav_link--active"
                        className="nav-link"
                      >
                        Admin Board
                      </NavLink>
                    )}

                    {showUserBoard && (
                      <NavLink
                        to={"/user"}
                        className="nav-link"
                        activeClassName="nav_link--active"
                      >
                        User
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
                        LogOut
                      </a>
                    </Nav>
                  ) : (
                    <Nav className="ml-auto">
                      <NavLink
                        to={"/login"}
                        className="nav-link"
                        activeClassName="nav_link--active"
                      >
                        Login
                      </NavLink>

                      <NavLink
                        to={"/register"}
                        className="nav-link"
                        activeClassName="nav_link--active"
                      >
                        Sign Up
                      </NavLink>

                      <NavLink to={"/superadmin"} className="nav-link">
                        Super admin
                      </NavLink>
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

                <Route
                  path="/user" // component={BoardUser}
                  // component={showUserBoard && BoardUser}
                >
                  {currentUser && <BoardUser currentUser={currentUser} />}
                </Route>
                <Route
                  path="/mod"
                  component={BoardModerator} // component={showModeratorBoard && BoardModerator}
                />
                <Route
                  path="/admin"
                  component={BoardAdmin} // component={showAdminBoard && BoardAdmin}
                />
              </Switch>
            </div>
          </>
        </Route>
      </Switch>
    </div>
  );
};

export default App;

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.logOut = this.logOut.bind(this);

//     this.state = {
//       showModeratorBoard: false,
//       showAdminBoard: false,
//       showUserBoard: false,
//       currentUser: undefined,
//     };
//   }

//   componentDidMount() {
//     const user = AuthService.getCurrentUser();

//     if (user) {
//       this.setState({
//         currentUser: user,
//         showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
//         showUserBoard: user.roles.includes("ROLE_USER"),
//         showAdminBoard: user.roles.includes("ROLE_ADMIN"),
//       });
//     }

//     EventBus.on("logout", () => {
//       this.logOut();
//     });
//   }

//   componentWillUnmount() {
//     EventBus.remove("logout");
//   }

//   logOut() {
//     AuthService.logout();
//     this.setState({
//       showModeratorBoard: false,
//       showAdminBoard: false,
//       showUserBoard: false,
//       currentUser: undefined,
//     });
//   }

//   render() {
//     const { currentUser, showModeratorBoard, showUserBoard, showAdminBoard } =
//       this.state;
//     // this.state.userId && console.log(this.state.userId);
//     return (
//       <div>
//         <Switch>
//           <Route path="/superadmin" component={SuperAdmin} />
//           <Route path="/">
//             <>
//               <Navbar
//                 className="navShadow"
//                 style={{ backgroundColor: "white" }}
//                 expand="sm"
//               >
//                 <Container>
//                   <Navbar.Brand className="navTitle">Nalog-net</Navbar.Brand>
//                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                   <Navbar.Collapse className="navLinks" id="basic-navbar-nav ">
//                     <Nav className="me-auto ">
//                       <NavLink
//                         exact
//                         to={"/"}
//                         className="nav-link"
//                         activeClassName="nav_link--active"
//                       >
//                         Home
//                       </NavLink>

//                       {showModeratorBoard && (
//                         <NavLink
//                           to={"/mod"}
//                           className="nav-link"
//                           activeClassName="nav_link--active"
//                         >
//                           Moderator Board
//                         </NavLink>
//                       )}

//                       {showAdminBoard && (
//                         <NavLink
//                           to={"/admin"}
//                           activeClassName="nav_link--active"
//                           className="nav-link"
//                         >
//                           Admin Board
//                         </NavLink>
//                       )}

//                       {showUserBoard && (
//                         <NavLink
//                           to={"/user"}
//                           className="nav-link"
//                           activeClassName="nav_link--active"
//                         >
//                           User
//                         </NavLink>
//                       )}
//                     </Nav>

//                     {currentUser ? (
//                       <Nav className="ml-auto">
//                         <NavLink
//                           to={"/profile"}
//                           className="nav-link"
//                           activeClassName="nav_link--active"
//                         >
//                           {currentUser.username}
//                         </NavLink>

//                         <a
//                           href="/login"
//                           className="nav-link"
//                           onClick={this.logOut}
//                         >
//                           LogOut
//                         </a>
//                       </Nav>
//                     ) : (
//                       <Nav className="ml-auto">
//                         <NavLink
//                           to={"/login"}
//                           className="nav-link"
//                           activeClassName="nav_link--active"
//                         >
//                           Login
//                         </NavLink>

//                         <NavLink
//                           to={"/register"}
//                           className="nav-link"
//                           activeClassName="nav_link--active"
//                         >
//                           Sign Up
//                         </NavLink>

//                         <NavLink to={"/superadmin"} className="nav-link">
//                           Super admin
//                         </NavLink>
//                       </Nav>
//                     )}
//                   </Navbar.Collapse>
//                 </Container>
//               </Navbar>

//               <div className="">
//                 <Switch>
//                   <Route exact path={["/"]} component={Home} />
//                   <Route exact path="/login" component={Login} />
//                   <Route exact path="/register" component={Register} />
//                   <Route exact path="/profile" component={Profile} />

//                   <Route
//                     path="/user"
//                     // component={BoardUser}
//                     // component={showUserBoard && BoardUser}
//                   >
//                     {currentUser && <BoardUser currentUser={currentUser} />}
//                   </Route>
//                   <Route
//                     path="/mod"
//                     component={BoardModerator}
//                     // component={showModeratorBoard && BoardModerator}
//                   />
//                   <Route
//                     path="/admin"
//                     component={BoardAdmin}
//                     // component={showAdminBoard && BoardAdmin}
//                   />
//                 </Switch>
//               </div>
//             </>
//           </Route>
//         </Switch>
//       </div>
//     );
//   }
// }

// export default App;
