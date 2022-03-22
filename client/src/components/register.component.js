import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from "react-router";

import AuthService from "../services/auth.service";
import { PersonPlus } from "react-bootstrap-icons";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vname = (value) => {
  if (value.length < 3 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        Name must be between 3 and 30 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [successful, setSuccessful] = useState();
  const form = useRef();
  const checkBtn = useRef();
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, name).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setSuccessful(false);
          setMessage(resMessage);
        }
      );
    }
  };
  const user = AuthService.getCurrentUser();

  if (user) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className="card card-container">
      <PersonPlus className="loginLogo" size={130} />
      <Form
        onSubmit={handleRegister}
        ref={(c) => {
          form.current = c;
        }}
      >
        {!successful && (
          <div>
            <div className="form-group">
              <Input
                type="text"
                className="loginInput"
                name="username"
                placeholder="name"
                value={name}
                onChange={onChangeName}
                validations={[required, vname]}
              />
            </div>
            <div className="form-group">
              {/* <label htmlFor="username">Username</label> */}
              <Input
                type="text"
                className="loginInput"
                name="username"
                placeholder="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />
            </div>

            <div className="form-group">
              {/* <label htmlFor="email">Email</label> */}
              <Input
                type="text"
                className="loginInput"
                name="email"
                placeholder="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, vemail]}
              />
            </div>

            <div className="form-group">
              {/* <label htmlFor="password">Password</label> */}
              <Input
                type="password"
                className="loginInput"
                name="password"
                placeholder="password"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>

            <div className="form-group">
              <button className="loginButton">Sign Up</button>
            </div>
          </div>
        )}

        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton
          style={{
            display: "none",
          }}
          ref={(c) => {
            checkBtn.current = c;
          }}
        />
      </Form>
    </div>
  );
};

export default Register;
