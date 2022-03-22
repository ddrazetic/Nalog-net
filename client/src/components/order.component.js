import React, { useState, useEffect } from "react";
import "react-popupbox/dist/react-popupbox.css";
import OrderDataService from "../services/order.service";
import ModeratorsDataService from "../services/moderators.service";

const Order = (props) => {
  // const [currentUser, setCurrentUser] = useState();
  const [nameWorker, setNameWorker] = useState();
  const [editId, setEditId] = useState();
  const [moderators, setModerators] = useState([]);
  const [countries, setCountries] = useState([]);
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
    // setSalary(100);
    setNameWorker(props.currentUser.name);
    setEditId(props.currentUser.id);
    retrieveModerators();
    retrieveCountries();
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
  const retrieveCountries = () => {
    OrderDataService.getAllCountries()
      .then((response) => {
        setCountries(response.data);
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

    setSalary(
      parseInt(
        countries
          .filter((country) => country.naziv === e.target.value)
          .map((country) => parseInt(country.dnevnice))
      )
    );
    // console.log(salary);
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
        (
          title &&
          // description && // this.state.editId &&
          // this.state.nameWorker &&
          // nameModerator &&
          countryDestination
        )
        // placeDestination &&
        // // salary &&
        // date &&
        // numberOfDays &&
        // !isNaN(numberOfDays)
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
        numberOfDays: parseInt(numberOfDays),
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
          if (response.data) {
            props.childFunc();
          }
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
                {countries.map((eachCountry, i) => (
                  <option key={i}>{eachCountry.naziv}</option>
                ))}
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
                // value={salary || ""}
                value={salary || ""}
                readOnly
                // {countries
                //   .filter((country) => country.naziv === countryDestination)
                //   .map((country) => country.dnevnice)}
                // onChange={onChangesalary}
                name="description"
              >
                {/* {countries
                  .find((country) => country.naziv === countryDestination)
                  
                   return country.dnevnice
                } */}
              </input>
            </div>
            {/* <div className="form-group">
              <label htmlFor="salary">Dnevnica:</label>
              <select
                type="text"
                className="form-control"
                id="description"
                required
                placeholder="dnevnica"
                // value={salary || ""}
                value={salary || ""}
                onChange={onChangesalary}
                name="description"
              >
                <option>izaberi</option>
                {countries
                  .filter((country) => country.naziv === countryDestination)
                  .map((country) => (
                    <option key={country.id}>{country.dnevnice}</option>
                  ))}
              </select>
            </div> */}

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
                type="number"
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
