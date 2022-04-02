import React, { useState, useEffect, useRef } from "react";
// import "react-popupbox/dist/react-popupbox.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";

import OrderDataService from "../../services/order.service";
import ModeratorsDataService from "../../services/moderators.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Obavezno popuniti ovo polje!
      </div>
    );
  }
};

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

  // const [successful, setSuccessful] = useState();
  const [submitted, setSubmitted] = useState();
  // const [message, setMessage] = useState();
  const form = useRef();
  const checkBtn = useRef();
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

  const onChangenameModerator = (e) => {
    setNameModerator(e.target.value);
  };
  const onChangecountryDestination = (e) => {
    setCountryDestination(e.target.value);

    setSalary(
      countries
        .filter((country) => country.naziv === e.target.value)
        .map((country) => {
          if (country.valuta === "USD") {
            return country.dnevnice * 6.91;
          } else if (country.valuta === "EUR") {
            return country.dnevnice * 7.55;
          } else {
            return country.dnevnice;
          }
        })
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
  const saveOrder = (e) => {
    e.preventDefault();
    // setMessage("");
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
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
          // setSuccessful(true);
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
  };

  return (
    <>
      <div className="submit-form form-padding">
        {submitted ? (
          <div>
            <h4>Uspješno je dodan nalog!</h4>
            <button className="buttonAddOrder" onClick={newOrder}>
              Novi nalog
            </button>
          </div>
        ) : (
          <Form
            className="formInputOrder"
            onSubmit={saveOrder}
            ref={(c) => {
              form.current = c;
            }}
          >
            <h1 className="headerOrder">Zahtjev za izradu putnog naloga:</h1>
            <div className="form-group1 form-group">
              <label htmlFor="title">Naslov:</label>
              <Input
                type="text"
                className="form-control  "
                id="title"
                // required="required"
                placeholder="unesite naslov"
                value={title || ""}
                onChange={onChangeTitle}
                name="title"
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Opis:</label>
              <Textarea
                type="text"
                rows={3}
                className="form-control"
                id="description"
                // required
                placeholder="opišite putovanje"
                value={description || ""}
                onChange={onChangeDescription}
                name="description"
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editId">Id djelatnika:</label>
              <Input
                type="text"
                className="form-control"
                id="editId"
                // required
                readOnly
                value={editId}
                // onChange={onChangeeditId}
                name="editId"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameWorker">Ime i prezime djelatnika:</label>
              <Input
                type="text"
                className="form-control"
                id="description"
                required
                readOnly
                value={nameWorker}
                // onChange={onChangenameWorker}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameModerator">
                Ime i prezime voditelja jedinice:
              </label>
              <Select
                className="form-control dropdown-toggle"
                placeholder="odaberite voditelja jedinice"
                value={nameModerator || ""}
                onChange={onChangenameModerator}
                validations={[required]}
              >
                <option></option>
                {moderators.map((eachUser, i) => (
                  <option key={i}>{eachUser.name}</option>
                ))}
              </Select>
            </div>

            <div className="form-group">
              <label htmlFor="countryDestination">Zemlja putovanja:</label>
              <Select
                className="form-control dropdown-toggle"
                placeholder="odaberite zemlju putovanja"
                validations={[required]}
                value={countryDestination || ""}
                onChange={onChangecountryDestination}
              >
                <option></option>
                {countries.map((eachCountry, i) => (
                  <option key={i}>{eachCountry.naziv}</option>
                ))}
              </Select>
            </div>
            <div className="form-group">
              <label htmlFor="placeDestination">Mjesto putovanja:</label>
              <Input
                type="text"
                className="form-control"
                id="title"
                // required
                validations={[required]}
                placeholder="unesite mjesto putovanja"
                value={placeDestination || ""}
                onChange={onChangeplaceDestination}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Dnevnica (HRK):</label>
              <Input
                type="number"
                className="form-control"
                id="description"
                // required
                placeholder="dnevnica"
                // value={salary || ""}
                value={salary || ""}
                readOnly
                name="description"
              ></Input>
            </div>

            <div className="form-group">
              <label htmlFor="date">Datum početka:</label>
              <Input
                type="date"
                className="form-control"
                id="title"
                // required
                placeholder="odaberite datum početka putovanja"
                validations={[required]}
                value={date || ""}
                onChange={onChangedate}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfDays">Broj dana boravka:</label>
              <Input
                type="number"
                className="form-control"
                id="description"
                // required
                validations={[required]}
                placeholder="unesite broj dana boravka"
                value={numberOfDays || ""}
                onChange={onChangenumberOfDays}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="addition">Dodatno (opcionalno):</label>
              <Textarea
                type="text"
                className="form-control"
                rows={3}
                id="description"
                // validations={[required]}
                // required
                placeholder="Napišite dodatne stavke vezane uz putovanje"
                value={addition || ""}
                onChange={onChangeaddition}
                name="description"
              />
            </div>

            <div className="form-group">
              {" "}
              <button className="buttonAddOrder">Potvrdi</button>
            </div>

            <CheckButton
              style={{
                display: "none",
              }}
              ref={(c) => {
                checkBtn.current = c;
              }}
            />
          </Form>
        )}
      </div>
    </>
  );
};

export default Order;
