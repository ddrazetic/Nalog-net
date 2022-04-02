import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import OrderList from "./orders-list";
const BoardAdmin = (props) => {
  const [content, setContent] = useState("");
  const [currentUser] = useState(props.currentUser);
  const [redirect, setRedirect] = useState(null);
  const childFunc = useRef(null);
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

        if (error.response && error.response.status === 403) {
          setRedirect("/");
        }
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  // if (content && content === "Require Admin Role!") {
  //   return <Redirect to="/" />;
  // }

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="card card-containerMax">
      {content === "Admin Content." ? (
        <>
          <OrderList childFunc={childFunc} currentUser={currentUser} />
        </>
      ) : (
        <p>pristup odbijen</p>
      )}
    </div>
  );
};

export default BoardAdmin;
