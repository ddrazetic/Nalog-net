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

const EditCosts = (props) => {
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
    totalCosts: 0,
    otherCosts: "",
    travelCosts: "",
  };
  const [currentOrder, setCurrentOrder] = useState(initialOrderState);
  const [currentCosts, setCurrentCosts] = useState(0);

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
  const sumAllCosts = () => {
    let sum =
      parseFloat(currentOrder.travelCosts || 0) +
      parseFloat(currentOrder.otherCosts || 0) +
      parseFloat(currentOrder.numberOfDays * currentOrder.salary);
    return sum;
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentOrder({
      ...currentOrder,
      [name]: value,
    });
    // setCurrentCosts(currentCosts + parseFloat(value));
    // console.log(currentCosts);
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
        totalCosts: sumAllCosts(),
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
          <h4>Dodajte troškove za nalog br. {currentOrder.id}</h4>
          <Form
            className="formInputOrder"
            onSubmit={updateOrder}
            ref={(c) => {
              form.current = c;
            }}
          >
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
              <label htmlFor="numberOfDays">Broj dana boravka:</label>
              <Input
                type="number"
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
              <label htmlFor="travelCosts">Troškovi puta:</label>
              <Input
                type="number"
                className="form-control"
                id="number"
                placeholder="unesite troškove puta."
                value={currentOrder.travelCosts || ""}
                onChange={handleInputChange}
                name="travelCosts"
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="otherCosts">Ostali troškovi:</label>
              <Input
                type="number"
                className="form-control"
                id="number"
                placeholder="unesite ostale troškove."
                value={currentOrder.otherCosts || ""}
                onChange={handleInputChange}
                name="otherCosts"
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="totalCosts">Ukupni troškovi:</label>
              <Input
                type="number"
                className="form-control"
                id="number"
                placeholder="unesite troškove puta."
                readOnly
                // value={currentOrder.totalCosts || ""}
                value={sumAllCosts()}
                // onChange={handleInputChange}
                name="totalCosts"
                validations={[required]}
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
export default EditCosts;
