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

// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeName = this.onChangeName.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);

//     this.state = {
//       name: "",
//       username: "",
//       email: "",
//       password: "",
//       successful: false,
//       message: "",
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value,
//     });
//   }
//   onChangeName(e) {
//     this.setState({
//       name: e.target.value,
//     });
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value,
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value,
//     });
//   }

//   handleRegister(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       successful: false,
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.register(
//         this.state.username,
//         this.state.email,
//         this.state.password,
//         this.state.name
//       ).then(
//         (response) => {
//           this.setState({
//             message: response.data.message,
//             successful: true,
//           });
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           this.setState({
//             successful: false,
//             message: resMessage,
//           });
//         }
//       );
//     }
//   }

//   render() {
//     const user = AuthService.getCurrentUser();
//     if (user) {
//       return <Redirect to={"/profile"} />;
//     }
//     return (
//       <div className="card card-container">
//         <PersonPlus className="loginLogo" size={130} />
//         <Form
//           onSubmit={this.handleRegister}
//           ref={(c) => {
//             this.form = c;
//           }}
//         >
//           {!this.state.successful && (
//             <div>
//               <div className="form-group">
//                 <Input
//                   type="text"
//                   className="loginInput"
//                   name="username"
//                   placeholder="name"
//                   value={this.state.name}
//                   onChange={this.onChangeName}
//                   validations={[required, vname]}
//                 />
//               </div>
//               <div className="form-group">
//                 {/* <label htmlFor="username">Username</label> */}
//                 <Input
//                   type="text"
//                   className="loginInput"
//                   name="username"
//                   placeholder="username"
//                   value={this.state.username}
//                   onChange={this.onChangeUsername}
//                   validations={[required, vusername]}
//                 />
//               </div>

//               <div className="form-group">
//                 {/* <label htmlFor="email">Email</label> */}
//                 <Input
//                   type="text"
//                   className="loginInput"
//                   name="email"
//                   placeholder="email"
//                   value={this.state.email}
//                   onChange={this.onChangeEmail}
//                   validations={[required, email]}
//                 />
//               </div>

//               <div className="form-group">
//                 {/* <label htmlFor="password">Password</label> */}
//                 <Input
//                   type="password"
//                   className="loginInput"
//                   name="password"
//                   placeholder="password"
//                   value={this.state.password}
//                   onChange={this.onChangePassword}
//                   validations={[required, vpassword]}
//                 />
//               </div>

//               <div className="form-group">
//                 <button className="loginButton">Sign Up</button>
//               </div>
//             </div>
//           )}

//           {this.state.message && (
//             <div className="form-group">
//               <div
//                 className={
//                   this.state.successful
//                     ? "alert alert-success"
//                     : "alert alert-danger"
//                 }
//                 role="alert"
//               >
//                 {this.state.message}
//               </div>
//             </div>
//           )}
//           <CheckButton
//             style={{ display: "none" }}
//             ref={(c) => {
//               this.checkBtn = c;
//             }}
//           />
//         </Form>
//       </div>
//     );
//   }
// }
