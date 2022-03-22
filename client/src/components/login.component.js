import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Redirect } from "react-router";
import AuthService from "../services/auth.service";
import { Person } from "react-bootstrap-icons";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState();
  const form = useRef();
  const checkBtn = useRef();
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  const user = AuthService.getCurrentUser();

  if (user) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className="card card-container">
      <Person className="loginLogo" size={130} />
      <Form
        onSubmit={handleLogin}
        ref={(c) => {
          form.current = c;
        }}
      >
        <div className="form-group">
          {/* <label htmlFor="username">Username</label> */}
          <Input
            type="text"
            className="loginInput"
            name="username"
            placeholder="username"
            value={username || ""}
            onChange={onChangeUsername}
            validations={[required]}
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="password">Password</label> */}
          <Input
            type="password"
            className="loginInput"
            name="password"
            placeholder="password"
            value={password || ""}
            onChange={onChangePassword}
            validations={[required]}
          />
        </div>

        <div className="form-group">
          <button className="loginButton" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
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

export default Login;
