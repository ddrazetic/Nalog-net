import React, { useState, useEffect, useRef } from "react";
import OrderDataService from "../../services/order.service";
import ModeratorsDataService from "../../services/moderators.service";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Obavezno popuniti ovo polje!
      </div>
    );
  }
};

const EditOrder = (props) => {
  const initialOrderState = {
    id: null,
    title: "",
    description: "",
    editId: "",
    nameWorker: "",
    nameModerator: "",
    countryDestination: "",
    placeDestination: "",
    salary: "",
    date: "",
    numberOfDays: "",
    addition: "",
    roleEditId: "",
  };
  const [currentOrder, setCurrentOrder] = useState(initialOrderState);

  // const [message, setMessage] = useState("");
  const [moderators, setModerators] = useState([]);
  const [countries, setCountries] = useState([]);
  const form = useRef();
  const checkBtn = useRef();

  useEffect(() => {
    setCurrentOrder(props.currentOrder);
    retrieveModerators();
    retrieveCountries();
  }, [props.currentOrder]);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentOrder({ ...currentOrder, [name]: value });
  };

  const onChangecountryDestination = (e) => {
    setCurrentOrder({
      ...currentOrder,
      countryDestination: e.target.value,
      salary: countries
        .filter((country) => country.naziv === e.target.value)
        .map((country) => {
          if (country.valuta === "USD") {
            return country.dnevnice * 6.91;
          } else if (country.valuta === "EUR") {
            return country.dnevnice * 7.55;
          } else {
            return country.dnevnice;
          }
        }),
    });
  };

  const updateOrder = (e) => {
    e.preventDefault();

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      OrderDataService.update(currentOrder.id, {
        ...currentOrder,
        roleEditId: 6,
      })
        .then((response) => {
          console.log(response.data);
          // setMessage("The Order was updated successfully!");
          if (response.data) {
            props.refreshList();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const deleteOrder = () => {
    OrderDataService.delete(currentOrder.id)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          props.refreshList();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentOrder ? (
        <div className="edit-form submit-form form-padding " id="editOrder">
          <h4>Uredi nalog br. {currentOrder.id}</h4>
          <Form
            className="formInputOrder"
            onSubmit={updateOrder}
            ref={(c) => {
              form.current = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="title">Naslov:</label>
              <Input
                type="text"
                className="form-control"
                id="title"
                placeholder="unesite naslov"
                value={currentOrder.title}
                onChange={handleInputChange}
                name="title"
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Opis:</label>
              <Textarea
                type="text"
                className="form-control"
                rows={3}
                id="description"
                placeholder="opišite putovanje"
                value={currentOrder.description}
                onChange={handleInputChange}
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
                readOnly
                value={currentOrder.editId}
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
                readOnly
                value={currentOrder.nameWorker}
                // onChange={onChangenameWorker}
                name="nameWorker"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameModerator">
                Ime i prezime voditelja jedinice:
              </label>
              <Select
                className="form-control dropdown-toggle"
                placeholder="odaberite voditelja jedinice"
                value={currentOrder.nameModerator}
                onChange={handleInputChange}
                name="nameModerator"
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
                value={currentOrder.countryDestination}
                onChange={onChangecountryDestination}
                name="countryDestination"
                validations={[required]}
              >
                <option>{currentOrder.countryDestination}</option>
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
                id="place"
                placeholder="unesite mjesto putovanja"
                value={currentOrder.placeDestination}
                onChange={handleInputChange}
                name="placeDestination"
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Dnevnica:</label>
              <Input
                type="text"
                className="form-control"
                id="salary"
                placeholder="dnevnica"
                readOnly
                value={currentOrder.salary}
                // onChange={handleInputChange}
                name="salary"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Datum početka:</label>
              <Input
                type="date"
                className="form-control"
                id="date"
                placeholder="odaberite datum početka putovanja"
                value={currentOrder.date}
                onChange={handleInputChange}
                name="date"
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfDays">Broj dana boravka:</label>
              <Input
                type="text"
                className="form-control"
                id="number"
                placeholder="unesite broj dana boravka"
                value={currentOrder.numberOfDays}
                onChange={handleInputChange}
                name="numberOfDays"
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="addition">Dodatno (opcionalno):</label>
              <Textarea
                type="text"
                className="form-control"
                id="addition"
                rows={3}
                placeholder="Napišite dodatne stavke vezane uz putovanje"
                value={currentOrder.addition || ""}
                onChange={handleInputChange}
                name="addition"
              />
            </div>
            <div className="form-group buttonsEdit">
              {" "}
              <button className="buttonAddOrder buttonDeleteOrder">
                Potvrdi
              </button>
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
          <div className="buttonsEdit">
            <button
              className="buttonAddOrder closeButton buttonDeleteOrder "
              onClick={deleteOrder}
            >
              Obriši
            </button>
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Order...</p>
        </div>
      )}
    </div>
  );
};
export default EditOrder;
