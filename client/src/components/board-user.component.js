import React, { Component } from "react";
import Order from "./order.component";
import OrderList from "./orders-list.component";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: props.currentUser,

      content: "",
      showing: false,
    };
  }

  componentDidMount() {
    // console.log(this.state.currentUser);
    UserService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    const { showing, currentUser } = this.state;
    return (
      <div className="card card-containerMax">
        <header>{/* <h3>{this.state.content}</h3> */}</header>
        {this.state.content === "User Content." ? (
          // <p>pristup dozvoljen</p>
          <>
            {" "}
            <button
              className={` buttonAddOrder ${showing ? "closeButton" : ""}`}
              onClick={() => this.setState({ showing: !showing })}
            >
              {showing ? "Zatvori" : "Dodaj nalog"}
            </button>
            {showing ? <Order /> : null}
            <OrderList currentUser={currentUser} />
          </>
        ) : (
          <p>pristup odbijen</p>
        )}
      </div>
    );
  }
}
