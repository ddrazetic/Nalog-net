import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router";
import Order from "./order";
import OrderList from "./orders-list";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

const BoardUser = (props) => {
  const [currentUser] = useState(props.currentUser);
  const [content, setContent] = useState("");
  const [showing, setShowing] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const childFunc = useRef(null);
  useEffect(() => {
    UserService.getUserBoard().then(
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

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="card card-containerMax">
      {content === "User Content." ? (
        <>
          {" "}
          <button
            className={` buttonAddOrder ${showing ? "closeButton" : ""}`}
            onClick={() => {
              setShowing(!showing);
              childFunc.current();
            }}
          >
            {showing ? "Zatvori" : "Dodaj nalog"}
          </button>
          {showing ? (
            <Order currentUser={currentUser} childFunc={childFunc.current} />
          ) : null}
          <OrderList childFunc={childFunc} currentUser={currentUser} />
        </>
      ) : (
        <p>pristup odbijen</p>
      )}
    </div>
  );
};

export default BoardUser;
