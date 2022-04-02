import React, { useState, useEffect, useRef } from "react";
import OrderDataService from "../../services/order.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { toast } from "react-toastify";
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

  const form = useRef();
  const checkBtn = useRef();

  useEffect(() => {
    setCurrentOrder(props.currentOrder);
  }, [props.currentOrder]);

  const sumAllCosts = () => {
    let sum =
      parseFloat(currentOrder.travelCosts || 0) +
      parseFloat(currentOrder.otherCosts || 0) +
      parseFloat(currentOrder.numberOfDays * currentOrder.salary);
    return sum;
  };

  const notifyEditCosts = () =>
    toast(
      "Uspješno ste izračunali troškove! Ukupni troškovi su: " +
        sumAllCosts().toLocaleString("en") +
        "HRK"
    );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentOrder({
      ...currentOrder,
      [name]: value,
    });
  };

  const updateOrder = (e) => {
    e.preventDefault();

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      notifyEditCosts();
      OrderDataService.update(currentOrder.id, {
        ...currentOrder,
        roleEditId: 7,
        totalCosts: sumAllCosts(),
      })
        .then((response) => {
          console.log(response.data);

          if (response.data) {
            props.refreshList();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {currentOrder ? (
        <div className="edit-form submit-form form-padding " id="editCosts">
          <h4>Dodajte troškove za nalog br. {currentOrder.id}</h4>
          <Form
            className="formInputOrder"
            onSubmit={updateOrder}
            ref={(c) => {
              form.current = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="salary">Dnevnica (HRK):</label>
              <Input
                type="text"
                className="form-control"
                id="salary"
                placeholder="dnevnica"
                readOnly
                value={currentOrder.salary}
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
              <label htmlFor="travelCosts">Troškovi puta (HRK):</label>
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
              <label htmlFor="otherCosts">Ostali troškovi (HRK):</label>
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
              <label htmlFor="totalCosts">Ukupni troškovi (HRK):</label>
              <Input
                type="text"
                className="form-control"
                id="number"
                placeholder="unesite troškove puta."
                readOnly
                value={sumAllCosts().toLocaleString("en")}
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
