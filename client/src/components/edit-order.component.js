import React, { useState, useEffect } from "react";
import OrderDataService from "../services/order.service";
import ModeratorsDataService from "../services/moderators.service";
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
  const [message, setMessage] = useState("");
  const [moderators, setModerators] = useState([]);
  const [countries, setCountries] = useState([]);

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
      salary: parseInt(
        countries
          .filter((country) => country.naziv === e.target.value)
          .map((country) => parseInt(country.dnevnice))
      ),
    });

    // setSalary(
    //   parseInt(
    //     countries
    //       .filter((country) => country.naziv === e.target.value)
    //       .map((country) => parseInt(country.dnevnice))
    //   )
    // );
    // console.log(salary);
  };

  const updateOrder = () => {
    OrderDataService.update(currentOrder.id, currentOrder)
      .then((response) => {
        console.log(response.data);
        setMessage("The Order was updated successfully!");
        if (response.data) {
          props.refreshList();
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
        <div className="edit-form submit-form " id="editOrder">
          <h4>Uredi nalog br. {currentOrder.id}</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Naslov:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="unesite naslov"
                value={currentOrder.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Opis:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="opišite putovanje"
                value={currentOrder.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="editId">Id djelatnika:</label>
              <input
                type="text"
                className="form-control"
                id="editId"
                readOnly
                defaultValue={currentOrder.editId}
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
                readOnly
                defaultValue={currentOrder.nameWorker}
                // onChange={onChangenameWorker}
                name="nameWorker"
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameModerator">
                Ime i prezime voditelja jedinice:
              </label>
              <select
                className="form-control dropdown-toggle"
                placeholder="odaberite voditelja jedinice"
                value={currentOrder.nameModerator}
                onChange={handleInputChange}
                name="nameModerator"
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
                value={currentOrder.countryDestination}
                onChange={onChangecountryDestination}
                name="countryDestination"
              >
                <option>{currentOrder.countryDestination}</option>
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
                id="place"
                placeholder="unesite mjesto putovanja"
                value={currentOrder.placeDestination}
                onChange={handleInputChange}
                name="placeDestination"
              />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Dnevnica:</label>
              <input
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
              <input
                type="date"
                className="form-control"
                id="date"
                placeholder="odaberite datum početka putovanja"
                value={currentOrder.date}
                onChange={handleInputChange}
                name="date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfDays">Broj dana boravka:</label>
              <input
                type="text"
                className="form-control"
                id="number"
                placeholder="unesite broj dana boravka"
                value={currentOrder.numberOfDays}
                onChange={handleInputChange}
                name="numberOfDays"
              />
            </div>
            <div className="form-group">
              <label htmlFor="addition">Dodatno (opcionalno):</label>
              <input
                type="text"
                className="form-control"
                id="addition"
                placeholder="Napišite dodatne stavke vezane uz putovanje"
                value={currentOrder.addition || ""}
                onChange={handleInputChange}
                name="addition"
              />
            </div>
          </form>
          <div className="buttonsEdit">
            {" "}
            <button className=" btn  btn-danger" onClick={deleteOrder}>
              Delete
            </button>
            <button
              className=" btn  btn-primary"
              type="submit"
              onClick={updateOrder}
            >
              Update
            </button>
          </div>

          <p>{message}</p>
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
