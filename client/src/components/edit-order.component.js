import React, { useState, useEffect } from "react";
import OrderDataService from "../services/order.service";
const EditOrder = (props) => {
  const initialOrderState = {
    id: null,
    title: "",
    description: "",
  };
  const [currentOrder, setCurrentOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCurrentOrder(props.currentOrder);
  }, [props.currentOrder]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentOrder({ ...currentOrder, [name]: value });
  };

  const updateOrder = () => {
    OrderDataService.update(currentOrder.id, currentOrder)
      .then((response) => {
        console.log(response.data);
        setMessage("The Order was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteOrder = () => {
    OrderDataService.delete(currentOrder.id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentOrder ? (
        <div className="edit-form">
          <h4>Order</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentOrder.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentOrder.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button onClick={deleteOrder}>Delete</button>
          <button type="submit" onClick={updateOrder}>
            Update
          </button>
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
