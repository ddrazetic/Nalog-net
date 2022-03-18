import React, { useEffect, useState } from "react";
import Order from "./order.component";
import OrderList from "./orders-list.component";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardUser = (props) => {
  const [currentUser] = useState(props.currentUser);
  const [content, setContent] = useState("");
  const [showing, setShowing] = useState(false);
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
            onClick={() => setShowing(!showing)}
          >
            {showing ? "Zatvori" : "Dodaj nalog"}
          </button>
          {showing ? <Order currentUser={currentUser} /> : null}
          <OrderList currentUser={currentUser} />
        </>
      ) : (
        <p>pristup odbijen</p>
      )}
    </div>
  );
};

export default BoardUser;
// export default class BoardUser extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       currentUser: props.currentUser,

//       content: "",
//       showing: false,
//     };
//   }

//   componentDidMount() {
//     // console.log(this.state.currentUser);
//     UserService.getUserBoard().then(
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
//         <header>{/* <h3>{this.state.content}</h3> */}</header>
//         {this.state.content === "User Content." ? (
//           // <p>pristup dozvoljen</p>
//           <>
//             {" "}
//             <button
//               className={` buttonAddOrder ${
//                 this.state.showing ? "closeButton" : ""
//               }`}
//               onClick={() => this.setState({ showing: !this.state.showing })}
//             >
//               {this.state.showing ? "Zatvori" : "Dodaj nalog"}
//             </button>
//             {this.state.showing ? (
//               <Order currentUser={this.state.currentUser} />
//             ) : null}
//             <OrderList currentUser={this.state.currentUser} />
//           </>
//         ) : (
//           <p>pristup odbijen</p>
//         )}
//       </div>
//     );
//   }
// }
