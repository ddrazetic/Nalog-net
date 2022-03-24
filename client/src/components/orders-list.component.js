import React, { useEffect, useState } from "react";
import OrderDataService from "../services/order.service";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
// import { Link } from "react-router-dom";
import EditOrder from "./edit-order.component";
// import Table from "react-bootstrap/Table";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const OrderList = (props) => {
  const [orders, setOrders] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [showing, setShowing] = useState(false);
  // const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    retrieveOrders();
    props.childFunc.current = refreshList; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const retrieveOrders = () => {
    OrderDataService.getAll()
      .then((response) => {
        setOrders(
          response.data.filter((order) => order.editId === props.currentUser.id)
        ); // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveOrders();
    setCurrentOrder(null);
    setCurrentIndex(-1);
    setShowing(false);
  };
  const setActiveOrder = (order, index) => {
    setCurrentOrder(order);
    setCurrentIndex(index);
    setShowing(false);
  };
  const columns = [
    {
      dataField: "id",
      text: "Br.naloga",
    },
    {
      dataField: "date",
      text: "Datum",
    },
    {
      dataField: "nameModerator",
      text: "Ime voditelja",
    },
    {
      dataField: "countryDestination",
      text: "Zemlja",
    },
  ];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // console.log(`clicked on row with index: ${row.id}`);
      setActiveOrder(row, row.id);
    },
  };

  const rowClasses = (row, rowIndex) => {
    if (row.id === currentIndex) return "active";
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
    <>
      <div className="list row tableOrders">
        <div className="col-md-8 table-responsive ">
          <h4>Lista naloga</h4>
          <BootstrapTable
            keyField="id"
            data={orders ? orders : []}
            columns={columns}
            striped
            bordered
            hover
            responsive="sm"
            pagination={paginationFactory()}
            rowEvents={rowEvents}
            rowClasses={rowClasses}
          />

          {/* <Table responsive="md" striped bordered hover size="sm">
            <thead>
              <tr>
                <th style={{ width: "100px" }}>br. Naloga</th>
                <th>Datum</th>
                <th>Ime voditelja</th>
                <th>Zemlja putovanja</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders
                  .filter((order) => order.editId === props.currentUser.id)
                  .map((order, index) => {
                    return (
                      <tr
                        className={index === currentIndex ? "active" : ""}
                        onClick={() => setActiveOrder(order, index)}
                        key={index}
                      >
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.nameModerator}</td>
                        <td>{order.countryDestination}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table> */}

          <button
            className="buttonAddOrder buttonAddOrderSmall"
            onClick={refreshList}
          >
            Osvježite listu
          </button>
        </div>
        <div className="col-md-4 ">
          {currentOrder ? (
            <div>
              <h4>Nalog br. {currentOrder.id}</h4>
              <div>
                <label>
                  <strong>Naslov: </strong>
                </label>{" "}
                {currentOrder.title}
              </div>
              <div>
                <label>
                  <strong>Opis:</strong>
                </label>{" "}
                {currentOrder.description}
              </div>
              <div>
                <label>
                  <strong>Ime djelatnika:</strong>
                </label>{" "}
                {currentOrder.nameWorker}
              </div>
              <div>
                <label>
                  <strong>Ime voditelja jedinice:</strong>
                </label>{" "}
                {currentOrder.nameModerator}
              </div>
              <div>
                <label>
                  <strong>Zemlja putovanja:</strong>
                </label>{" "}
                {currentOrder.countryDestination}
              </div>
              <div>
                <label>
                  <strong>Mjesto putovanja:</strong>
                </label>{" "}
                {currentOrder.placeDestination}
              </div>
              <div>
                <label>
                  <strong>Dnevnica:</strong>
                </label>{" "}
                {currentOrder.salary} HRK
              </div>
              <div>
                <label>
                  <strong>Datum početka:</strong>
                </label>{" "}
                {currentOrder.date}
              </div>
              <div>
                <label>
                  <strong>Broj dana boravka:</strong>
                </label>{" "}
                {currentOrder.numberOfDays}
              </div>
              <div>
                <label>
                  <strong>Dodatno:</strong>
                </label>{" "}
                {currentOrder.addition}
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentOrder.roleEditId}
              </div>
              {/* OVO SE TREBA PROMIJENITI U 1 KASNIJE */}
              {currentOrder.roleEditId === 2 ? (
                <>
                  <button
                    className={`buttonAddOrder  buttonAddOrderSmall ${
                      !showing ? "" : "closeButton"
                    }  `}
                    onClick={() => {
                      setShowing(!showing);
                      // window.location("#editOrder");
                    }}
                  >
                    {showing ? (
                      "Zatvorite formu za uređivanje"
                    ) : (
                      <a className="scrollButton" href="#editOrder">
                        Otvorite formu za uređivanje
                      </a>
                    )}
                  </button>
                </>
              ) : (
                <p style={{ color: "red" }}>
                  Ovaj nalog se ne možete uređivati!
                </p>
              )}
            </div>
          ) : (
            <div>
              <br />
              <p>Kliknite na nalog...</p>
            </div>
          )}
        </div>
      </div>
      {showing && currentOrder ? (
        <EditOrder refreshList={refreshList} currentOrder={currentOrder} />
      ) : null}
    </>
  );
};

export default OrderList;
