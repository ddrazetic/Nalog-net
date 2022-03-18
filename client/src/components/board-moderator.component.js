import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardModerator = (props) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getModeratorBoard().then(
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
      <header>
        <h3>{content}</h3>
      </header>
      {content === "Moderator Content." ? (
        <p>pristup dozvoljen</p>
      ) : (
        <p>pristup odbijen</p>
      )}
    </div>
  );
};

export default BoardModerator;
// import React, { Component } from "react";

// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";

// export default class BoardModerator extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: "",
//     };
//   }

//   componentDidMount() {
//     UserService.getModeratorBoard().then(
//       (response) => {
//         this.setState({
//           content: response.data,
//         });
//       },
//       (error) => {
//         this.setState({
//           content:
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString(),
//         });

//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch("logout");
//         }
//       }
//     );
//   }

//   render() {
//     return (
//       <div className="card card-containerMax">
//         <header>
//           <h3>{this.state.content}</h3>
//         </header>
//         {this.state.content === "Moderator Content." ? (
//           <p>pristup dozvoljen</p>
//         ) : (
//           <p>pristup odbijen</p>
//         )}
//       </div>
//     );
//   }
// }
