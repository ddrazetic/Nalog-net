import React, { useEffect, useState } from "react";
import Homepage from "../homepage.jpg";
import UserService from "../services/user.service";

const Home = (props) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      }
    );
  }, []);
  return (
    <div className="card card-containerMax containerHome">
      <div className="imageHome">
        <img src={Homepage} alt="homepage"></img>
      </div>
      <h1 className="textHome">{content}</h1>
    </div>
  );
};

export default Home;

// export default class Home extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: "",
//     };
//   }

//   componentDidMount() {
//     UserService.getPublicContent().then(
//       (response) => {
//         this.setState({
//           content: response.data,
//         });
//       },
//       (error) => {
//         this.setState({
//           content:
//             (error.response && error.response.data) ||
//             error.message ||
//             error.toString(),
//         });
//       }
//     );
//   }

//   render() {
//     return (
//       <div className="card card-containerMax containerHome">
//         <div className="imageHome">
//           <img src={Homepage} alt="homepage"></img>
//         </div>
//         <h1 className="textHome">{this.state.content}</h1>
//       </div>
//     );
//   }
// }
