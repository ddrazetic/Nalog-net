import React, { useState, useEffect, useRef } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import OrderList from "./orders-list.component";
const BoardAdmin = (props) => {
  const [content, setContent] = useState("");
  const [currentUser] = useState(props.currentUser);
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

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
  return (
    <div className="card card-containerMax">
      <header>{/* <h3>{content}</h3> */}</header>
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
