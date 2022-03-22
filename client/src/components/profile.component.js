import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

const Profile = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: "",
  });
  useEffect(() => {
    const currentUser1 = AuthService.getCurrentUser();

    if (!currentUser) {
      setRedirect("/");
    }

    setCurrentUser(currentUser1);
    setUserReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="card card-container">
      {userReady ? (
        <div>
          <header className="">
            <h3>
              Username: <strong>{currentUser.username}</strong>
            </h3>
            <h3>
              Name: <strong>{currentUser.name}</strong>
            </h3>
          </header>

          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
