import React, { useEffect, useState, useRef } from "react";
import Order from "./order.component";
import OrderList from "./orders-list.component";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

const BoardUser = (props) => {
  const [currentUser] = useState(props.currentUser);
  const [content, setContent] = useState("");
  const [showing, setShowing] = useState(false);
  const childFunc = useRef(null);
  useEffect(() => {
    // console.log(this.state.currentUser);
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

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
  return (
    <div className="card card-containerMax">
      <header>{/* <h3>{this.state.content}</h3> */}</header>
      {content === "User Content." ? ( // <p>pristup dozvoljen</p>
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
