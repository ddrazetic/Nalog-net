import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

const BoardAdmin = (props) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
  return (
    <div className="card card-containerMax">
      <header>
        <h3>{content}</h3>
      </header>
      {content === "Admin Content." ? (
        <p>pristup dozvoljen</p>
      ) : (
        <p>pristup odbijen</p>
      )}
    </div>
  );
};

export default BoardAdmin;
