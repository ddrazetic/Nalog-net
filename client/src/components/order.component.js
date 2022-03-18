import React, { useState, useEffect } from "react";
import "react-popupbox/dist/react-popupbox.css";
import OrderDataService from "../services/order.service";
import ModeratorsDataService from "../services/moderators.service";

const Order = (props) => {
  // const [currentUser, setCurrentUser] = useState();
  const [nameWorker, setNameWorker] = useState();
  const [editId, setEditId] = useState();
  const [moderators, setModerators] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [nameModerator, setNameModerator] = useState();
  const [countryDestination, setCountryDestination] = useState();
  const [placeDestination, setPlaceDestination] = useState();
  const [salary, setSalary] = useState();
  const [date, setDate] = useState();
  const [numberOfDays, setNumberOfDays] = useState();
  const [addition, setAddition] = useState();
  const [errorInput, setErrorInput] = useState();
  const [submitted, setSubmitted] = useState();
  /* eslint-disable no-unused-vars */
  const [id, setId] = useState();
  useEffect(() => {
    // setCurrentUser(props.currentUser);
    setNameWorker(props.currentUser.name);
    setEditId(props.currentUser.id);
    retrieveModerators();
    // console.log(moderators);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const retrieveModerators = () => {
    ModeratorsDataService.getAll()
      .then((response) => {
        setModerators(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  // const onChangeeditId = (e) => {
  //   setEditId(e.target.value);
  // };
  // const onChangenameWorker = (e) => {
  //   setNameWorker(e.target.value);
  // };
  const onChangenameModerator = (e) => {
    setNameModerator(e.target.value);
  };
  const onChangecountryDestination = (e) => {
    setCountryDestination(e.target.value);
  };
  const onChangeplaceDestination = (e) => {
    setPlaceDestination(e.target.value);
  };
  const onChangesalary = (e) => {
    setSalary(e.target.value);
  };
  const onChangedate = (e) => {
    setDate(e.target.value);
  };
  const onChangenumberOfDays = (e) => {
    setNumberOfDays(e.target.value);
  };
  const onChangeaddition = (e) => {
    setAddition(e.target.value);
  };
  const saveOrder = () => {
    if (
      !(
        title &&
        description && // this.state.editId &&
        // this.state.nameWorker &&
        nameModerator &&
        countryDestination &&
        placeDestination &&
        salary &&
        date &&
        numberOfDays &&
        !isNaN(numberOfDays)
      )
    ) {
      setErrorInput(
        "Sva polja moraju biti popunjena i dani boravka moraju biti broj!"
      );
    } else {
      setSubmitted(true);

      var data = {
        title: title,
        description: description,
        editId: editId,
        nameWorker: nameWorker,
        nameModerator: nameModerator,
        countryDestination: countryDestination,
        placeDestination: placeDestination,
        salary: salary,
        date: date,
        numberOfDays: numberOfDays,
        addition: addition,
      };
      OrderDataService.create(data)
        .then((response) => {
          setId(response.data.id);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setSubmitted(true);
          setEditId(response.data.editId);
          setNameWorker(response.data.nameWorker);
          setNameModerator(response.data.nameModerator);
          setCountryDestination(response.data.countryDestination);
          setPlaceDestination(response.data.placeDestination);
          setSalary(response.data.salary);
          setDate(response.data.date);
          setNumberOfDays(response.data.numberOfDays);
          setAddition(response.data.addition);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const newOrder = () => {
    setId(null);
    setTitle("");
    setDescription("");
    setSubmitted(false);
    setNameModerator("");
    setCountryDestination("");
    setPlaceDestination("");
    setSalary("");
    setDate("");
    setNumberOfDays("");
    setAddition("");
    setErrorInput("");
  };

  return (
    <>
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>Uspješno je dodan nalog!</h4>
            <button className="buttonAddOrder" onClick={newOrder}>
              Novi nalog
            </button>
          </div>
        ) : (
          <div>
            <h1 className="headerOrder">Zahtjev za izradu putnog naloga:</h1>
            <div className="form-group">
              <label htmlFor="title">Naslov:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required="required"
                placeholder="unesite naslov"
                value={title || ""}
                onChange={onChangeTitle}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Opis:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                placeholder="opišite putovanje"
                value={description || ""}
                onChange={onChangeDescription}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="editId">Id djelatnika:</label>
              <input
                type="text"
                className="form-control"
                id="editId"
                required
                readOnly
                defaultValue={editId}
                // onChange={onChangeeditId}
                name="editId"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameWorker">Ime i prezime djelatnika:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                readOnly
                defaultValue={nameWorker}
                // onChange={onChangenameWorker}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameModerator">
                Ime i prezime voditelja jedinice:
              </label>
              <select
                className="form-control dropdown-toggle"
                placeholder="odaberite voditelja jedinice"
                value={nameModerator || ""}
                onChange={onChangenameModerator}
              >
                <option></option>
                {moderators.map((eachUser, i) => (
                  <option key={i}>{eachUser.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="countryDestination">Zemlja putovanja:</label>
              <select
                className="form-control dropdown-toggle"
                placeholder="odaberite zemlju putovanja"
                value={countryDestination || ""}
                onChange={onChangecountryDestination}
              >
                <option></option>
                <option>hr</option>
                <option>da</option>
                <option>4d</option>
                <option>5dd</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="placeDestination">Mjesto putovanja:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                placeholder="unesite mjesto putovanja"
                value={placeDestination || ""}
                onChange={onChangeplaceDestination}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Dnevnica:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                placeholder="dnevnica"
                value={salary || ""}
                onChange={onChangesalary}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Datum početka:</label>
              <input
                type="date"
                className="form-control"
                id="title"
                required
                placeholder="odaberite datum početka putovanja"
                value={date || ""}
                onChange={onChangedate}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfDays">Broj dana boravka:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                placeholder="unesite broj dana boravka"
                value={numberOfDays || ""}
                onChange={onChangenumberOfDays}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="addition">Dodatno (opcionalno):</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                placeholder="Napišite dodatne stavke vezane uz putovanje"
                value={addition || ""}
                onChange={onChangeaddition}
                name="description"
              />
            </div>
            <div className={`  ${errorInput ? "errorInput1" : ""}`}>
              <p>{errorInput}</p>
            </div>
            <button onClick={saveOrder} className="buttonAddOrder">
              Potvrdi
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;

// export default class Order extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeTitle = this.onChangeTitle.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangeeditId = this.onChangeeditId.bind(this);
//     this.onChangenameWorker = this.onChangenameWorker.bind(this);
//     this.onChangenameModerator = this.onChangenameModerator.bind(this);
//     this.onChangecountryDestination =
//       this.onChangecountryDestination.bind(this);
//     this.onChangeplaceDestination = this.onChangeplaceDestination.bind(this);
//     this.onChangesalary = this.onChangesalary.bind(this);
//     this.onChangedate = this.onChangedate.bind(this);
//     this.onChangenumberOfDays = this.onChangenumberOfDays.bind(this);
//     this.onChangeaddition = this.onChangeaddition.bind(this);

//     this.saveOrder = this.saveOrder.bind(this);
//     this.newOrder = this.newOrder.bind(this);
//     // this.handleClick = this.handleClick.bind(this);

//     this.state = {
//       id: null,
//       title: "",
//       description: "",
//       submitted: false,
//       editId: "",
//       nameWorker: "",
//       nameModerator: "",
//       countryDestination: "",
//       placeDestination: "",
//       salary: "",
//       date: "",
//       numberOfDays: "",
//       addition: "",
//       errorInput: "",
//       currentUser: { username: "" },
//       moderators: [],
//     };
//   }

//   componentDidMount() {
//     const currentUser = AuthService.getCurrentUser();
//     if (!currentUser) this.setState({ redirect: "/" });
//     this.setState({
//       currentUser: currentUser,
//       nameWorker: currentUser.name,
//       editId: currentUser.id,
//     });

//     ModeratorsDataService.getAll()
//       .then((response) => {
//         this.setState({
//           moderators: response.data,
//         });
//         // this.state.users.map((each) => console.log(each.roles.id));

//         // console.log(this.state.users[0].name);
//       })
//       .catch((e) => {
//         console.log(e);
//       });

//     //console.log(currentUser);
//   }

//   onChangeTitle(e) {
//     this.setState({
//       title: e.target.value,
//     });
//   }
//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value,
//     });
//   }

//   onChangeeditId(e) {
//     this.setState({
//       editId: e.target.value,
//     });
//   }
//   onChangenameWorker(e) {
//     this.setState({
//       nameWorker: e.target.value,
//     });
//   }
//   onChangenameModerator(e) {
//     this.setState({
//       nameModerator: e.target.value,
//     });
//   }
//   onChangecountryDestination(e) {
//     this.setState({
//       countryDestination: e.target.value,
//     });
//   }
//   onChangeplaceDestination(e) {
//     this.setState({
//       placeDestination: e.target.value,
//     });
//   }
//   onChangesalary(e) {
//     this.setState({
//       salary: e.target.value,
//     });
//   }
//   onChangedate(e) {
//     this.setState({
//       date: e.target.value,
//     });
//   }
//   onChangenumberOfDays(e) {
//     this.setState({
//       numberOfDays: e.target.value,
//     });
//   }
//   onChangeaddition(e) {
//     this.setState({
//       addition: e.target.value,
//     });
//   }

//   saveOrder() {
//     if (
//       !(
//         (
//           this.state.title &&
//           this.state.description &&
//           // this.state.editId &&
//           // this.state.nameWorker &&
//           this.state.nameModerator &&
//           this.state.countryDestination &&
//           this.state.placeDestination &&
//           this.state.salary &&
//           this.state.date &&
//           this.state.numberOfDays &&
//           !isNaN(this.state.numberOfDays)
//         )
//         // && this.state.addition
//       )
//     ) {
//       this.setState({
//         errorInput:
//           "Sva polja moraju biti popunjena i dani boravka moraju biti broj!",
//       });
//     } else {
//       this.setState({
//         submitted: true,
//       });
//       // console.log(this.state);
//       var data = {
//         title: this.state.title,
//         description: this.state.description,
//         editId: this.state.editId,
//         nameWorker: this.state.nameWorker,
//         nameModerator: this.state.nameModerator,
//         countryDestination: this.state.countryDestination,
//         placeDestination: this.state.placeDestination,
//         salary: this.state.salary,
//         date: this.state.date,
//         numberOfDays: this.state.numberOfDays,
//         addition: this.state.addition,
//       };
//       OrderDataService.create(data)
//         .then((response) => {
//           this.setState({
//             id: response.data.id,
//             title: response.data.title,
//             description: response.data.description,
//             submitted: true,
//             editId: response.data.editId,
//             nameWorker: response.data.nameWorker,
//             nameModerator: response.data.nameModerator,
//             countryDestination: response.data.countryDestination,
//             placeDestination: response.data.placeDestination,
//             salary: response.data.salary,
//             date: response.data.date,
//             numberOfDays: response.data.numberOfDays,
//             addition: response.data.addition,
//           });
//           console.log(response.data);
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     }
//   }
//   newOrder() {
//     this.setState({
//       id: null,
//       title: "",
//       description: "",
//       submitted: false,
//       // editId: "",
//       // nameWorker: "",
//       nameModerator: "",
//       countryDestination: "",
//       placeDestination: "",
//       salary: "",
//       date: "",
//       numberOfDays: "",
//       addition: "",
//       errorInput: "",
//     });
//   }

//   render() {
//     // let errorInput = "";

//     return (
//       <>
//         {/* <PopupboxContainer /> */}
//         <div className="submit-form">
//           {this.state.submitted ? (
//             <div>
//               <h4>Uspješno je dodan nalog!</h4>
//               <button className="buttonAddOrder" onClick={this.newOrder}>
//                 Novi nalog
//               </button>
//             </div>
//           ) : (
//             <div>
//               <h1 className="headerOrder">Zahtjev za izradu putnog naloga:</h1>
//               <div className="form-group">
//                 <label htmlFor="title">Naslov:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="title"
//                   required="required"
//                   placeholder="unesite naslov"
//                   value={this.state.title}
//                   onChange={this.onChangeTitle}
//                   name="title"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Opis:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   required
//                   placeholder="opišite putovanje"
//                   value={this.state.description}
//                   onChange={this.onChangeDescription}
//                   name="description"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="editId">Id djelatnika:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="editId"
//                   required
//                   readOnly
//                   value={this.state.editId}
//                   onChange={this.onChangeeditId}
//                   name="editId"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="nameWorker">Ime i prezime djelatnika:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   required
//                   readOnly
//                   value={this.state.nameWorker}
//                   onChange={this.onChangenameWorker}
//                   name="description"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="nameModerator">
//                   Ime i prezime voditelja jedinice:
//                 </label>
//                 <select
//                   className="form-control dropdown-toggle"
//                   placeholder="odaberite voditelja jedinice"
//                   value={this.state.nameModerator}
//                   onChange={this.onChangenameModerator}
//                 >
//                   <option></option>
//                   {this.state.moderators.map((eachUser, i) => (
//                     <option key={i}>{eachUser.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="countryDestination">Zemlja putovanja:</label>
//                 <select
//                   className="form-control dropdown-toggle"
//                   placeholder="odaberite zemlju putovanja"
//                   value={this.state.countryDestination}
//                   onChange={this.onChangecountryDestination}
//                 >
//                   <option></option>
//                   <option>hr</option>
//                   <option>da</option>
//                   <option>4d</option>
//                   <option>5dd</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="placeDestination">Mjesto putovanja:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="title"
//                   required
//                   placeholder="unesite mjesto putovanja"
//                   value={this.state.placeDestination}
//                   onChange={this.onChangeplaceDestination}
//                   name="title"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="salary">Dnevnica:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   required
//                   placeholder="dnevnica"
//                   value={this.state.salary}
//                   onChange={this.onChangesalary}
//                   name="description"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="date">Datum početka:</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   id="title"
//                   required
//                   placeholder="odaberite datum početka putovanja"
//                   value={this.state.date}
//                   onChange={this.onChangedate}
//                   name="title"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="numberOfDays">Broj dana boravka:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   required
//                   placeholder="unesite broj dana boravka"
//                   value={this.state.numberOfDays}
//                   onChange={this.onChangenumberOfDays}
//                   name="description"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="addition">Dodatno (opcionalno):</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   required
//                   placeholder="Napišite dodatne stavke vezane uz putovanje"
//                   value={this.state.addition}
//                   onChange={this.onChangeaddition}
//                   name="description"
//                 />
//               </div>
//               <div
//                 className={`  ${this.state.errorInput ? "errorInput1" : ""}`}
//               >
//                 <p>{this.state.errorInput}</p>
//               </div>
//               <button onClick={this.saveOrder} className="buttonAddOrder">
//                 Potvrdi
//               </button>
//             </div>
//           )}
//         </div>
//       </>
//     );
//   }
// }
