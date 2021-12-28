import React, { Component } from "react";
import Homepage from "../homepage.jpg";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="card card-containerMax">
        <header>
          <h3>{this.state.content}</h3>
        </header>
        <img src={Homepage} alt="homepage"></img>
      </div>
    );
  }
}
