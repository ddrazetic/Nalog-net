import React, { useEffect, useState } from "react";
import OrderDataService from "../services/order.service";
import { Link } from "react-router-dom";

const OrderList = (props) => {
  const [orders, setOrders] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  // const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    retrieveOrders();
  }, []);
  const retrieveOrders = () => {
    OrderDataService.getAll()
      .then((response) => {
        setOrders(response.data); // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveOrders();
    setCurrentOrder(null);
    setCurrentIndex(-1);
  };
  const setActiveOrder = (order, index) => {
    setCurrentOrder(order);
    setCurrentIndex(index);
  };
  // const removeAllOrders = () => {
  //   OrderDataService.deleteAll()
  //     .then((response) => {
  //       console.log(response.data);
  //       refreshList();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Lista naloga</h4>

        <ul className="list-group">
          {orders &&
            orders
              .filter((order) => order.editId === props.currentUser.id)
              .map((order, index) => {
                return (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveOrder(order, index)}
                    key={index}
                  >
                    {order.title + order.editId}
                  </li>
                );
              })}
        </ul>

        <button className="m-3 btn btn-sm btn-danger" onClick={refreshList}>
          Refresh list
        </button>
      </div>
      <div className="col-md-6">
        {currentOrder ? (
          <div>
            <h4>order</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentOrder.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentOrder.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentOrder.published ? "Published" : "Pending"}
            </div>

            <Link to={"/orders/" + currentOrder.id}>Edit</Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a order...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;

// export default class OrderList extends Component {
//   constructor(props) {
//     super(props);

//     this.retrieveTutorials = this.retrieveTutorials.bind(this);
//     this.refreshList = this.refreshList.bind(this);
//     this.setActiveTutorial = this.setActiveTutorial.bind(this);
//     this.removeAllTutorials = this.removeAllTutorials.bind(this);

//     this.state = {
//       currentUser: props.currentUser,
//       tutorials: [],
//       currentTutorial: null,
//       currentIndex: -1,
//       searchTitle: "",
//     };
//   }

//   componentDidMount() {
//     this.retrieveTutorials();
//     // console.table(this.state.tutorials);
//   }

//   retrieveTutorials() {
//     OrderDataService.getAll()
//       .then((response) => {
//         this.setState({
//           tutorials: response.data,
//         });
//         // console.log(response.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }

//   refreshList() {
//     this.retrieveTutorials();
//     this.setState({
//       currentTutorial: null,
//       currentIndex: -1,
//     });
//   }

//   setActiveTutorial(tutorial, index) {
//     this.setState({
//       currentTutorial: tutorial,
//       currentIndex: index,
//     });
//   }

//   removeAllTutorials() {
//     OrderDataService.deleteAll()
//       .then((response) => {
//         console.log(response.data);
//         this.refreshList();
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }

//   render() {
//     const { tutorials, currentTutorial, currentIndex, currentUser } =
//       this.state;

//     return (
//       <div className="list row">
//         <div className="col-md-6">
//           <h4>Lista naloga</h4>
//           {/* <div>
//             {tutorials
//               .filter((tutorial) => tutorial.editId == "11")
//               .map((filteredPerson) => (
//                 <li>{filteredPerson.title}</li>
//               ))}
//           </div> */}

//           <ul className="list-group">
//             {tutorials &&
//               tutorials
//                 .filter((tutorial) => tutorial.editId === currentUser.id)
//                 .map((tutorial, index) => {
//                   return (
//                     <li
//                       className={
//                         "list-group-item " +
//                         (index === currentIndex ? "active" : "")
//                       }
//                       onClick={() => this.setActiveTutorial(tutorial, index)}
//                       key={index}
//                     >
//                       {tutorial.title + tutorial.editId}
//                     </li>
//                   );
//                 })}
//           </ul>

//           <button
//             className="m-3 btn btn-sm btn-danger"
//             onClick={this.refreshList}
//           >
//             Refresh list
//           </button>
//         </div>
//         <div className="col-md-6">
//           {currentTutorial ? (
//             <div>
//               <h4>Tutorial</h4>
//               <div>
//                 <label>
//                   <strong>Title:</strong>
//                 </label>{" "}
//                 {currentTutorial.title}
//               </div>
//               <div>
//                 <label>
//                   <strong>Description:</strong>
//                 </label>{" "}
//                 {currentTutorial.description}
//               </div>
//               <div>
//                 <label>
//                   <strong>Status:</strong>
//                 </label>{" "}
//                 {currentTutorial.published ? "Published" : "Pending"}
//               </div>

//               <Link to={"/tutorials/" + currentTutorial.id}>Edit</Link>
//             </div>
//           ) : (
//             <div>
//               <br />
//               <p>Please click on a Tutorial...</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }
