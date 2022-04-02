import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from "react-router";

import AuthService from "../../services/auth.service";
import { PersonPlus } from "react-bootstrap-icons";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ovo polje je obavezno!
      </div>
    );
  }
};

const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Nije valjani email!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Korisničko ime mora biti između 3 i 20 znakova!
      </div>
    );
  }
};
const vname = (value) => {
  if (value.length < 3 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        Ime i prezime mora biti između 3 i 30 znakova!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Lozinka mora biti između 6 i 40 znakova!
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
                placeholder="Ime i prezime"
                value={name}
                onChange={onChangeName}
                validations={[required, vname]}
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                className="loginInput"
                name="username"
                placeholder="Korisničko ime"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />
            </div>

            <div className="form-group">
              <Input
                type="text"
                className="loginInput"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, vemail]}
              />
            </div>

            <div className="form-group">
              <Input
                type="password"
                className="loginInput"
                name="password"
                placeholder="Lozinka"
                value={password}
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>

            <div className="form-group">
              <button className="loginButton">Registriraj se</button>
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
