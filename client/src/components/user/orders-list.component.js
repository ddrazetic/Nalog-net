import React, { useEffect, useState } from "react";
import OrderDataService from "../../services/order.service";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
// import { Link } from "react-router-dom";
import EditOrder from "./edit-order.component";
// import Table from "react-bootstrap/Table";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import EditCosts from "./edit-costs.component";

const OrderList = (props) => {
  const [orders, setOrders] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [showing, setShowing] = useState(false);
  const [showingCosts, setShowingCosts] = useState(false);
  // const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    retrieveOrders();
    // document.querySelectorAll(".buttonAddOrder").inner("style", `color:red`);
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
    setShowingCosts(false);
  };
  const setActiveOrder = (order, index) => {
    setCurrentOrder(order);
    setCurrentIndex(index);
    setShowingCosts(false);
    setShowing(false);
  };

  const selectOptions = {
    1: "Kod djelatnika",
    2: "Kod voditelja jedinice",
    3: "Kod direktora",
    5: "Arhiva - odbijeni nalozi",
    6: "Arhiva - odobreni nalozi",
    7: "Arhiva - čekanje naplate",
    8: "Arhiva - plaćeni nalozi",
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
    {
      dataField: "roleEditId",
      text: "Status",
      filter: selectFilter({
        options: selectOptions,
      }),
    },
  ];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // console.log(`clicked on row with index: ${row.id}`);
      setActiveOrder(row, row.id);
    },
  };

  const rowClasses = (row, rowIndex) => {
    // if (row.roleEditId === 2) return "opacityRow";
    if (row.id === currentIndex) return "active";
    if (row.roleEditId === 5) return "redRow  ";
    if (row.roleEditId === 6) return "yellowRow ";
    if (row.roleEditId === 7) return "greenRow ";
    if (row.roleEditId === 8) return "grayRow ";
    if (row.roleEditId > 1) return "opacityRow  ";
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
          <h4 className="h4">Lista naloga</h4>
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
            filter={filterFactory()}
          />

          <button
            className="buttonAddOrder buttonAddOrderSmall "
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
              {currentOrder.roleEditId === 1 ? (
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
                <>
                  <p style={{ color: "red" }}>
                    Ovaj nalog se ne može uređivati!
                  </p>
                  {currentOrder.roleEditId === 6 ? (
                    <>
                      <button
                        className={`buttonAddOrder  buttonAddOrderSmall ${
                          !showingCosts ? "" : "closeButton"
                        }  `}
                        onClick={() => {
                          setShowingCosts(!showingCosts);
                          // window.location("#editOrder");
                        }}
                      >
                        {showingCosts ? (
                          "Zatvorite formu za plaćanje"
                        ) : (
                          <a className="scrollButton" href="#editCosts">
                            Otvorite formu za plaćanje
                          </a>
                        )}
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                  {currentOrder.roleEditId === 7 ||
                  currentOrder.roleEditId === 8 ? (
                    <>
                      <div>
                        <label>
                          <strong>Ukupno dnevnica:</strong>
                        </label>{" "}
                        {parseFloat(
                          currentOrder.salary * currentOrder.numberOfDays
                        ).toLocaleString("en")}{" "}
                        HRK
                      </div>
                      <div>
                        <label>
                          <strong>Putni troškovi:</strong>
                        </label>{" "}
                        {parseFloat(currentOrder.travelCosts).toLocaleString(
                          "en"
                        )}{" "}
                        HRK
                      </div>
                      <div>
                        <label>
                          <strong>Ostali troškovi:</strong>
                        </label>{" "}
                        {parseFloat(currentOrder.otherCosts).toLocaleString(
                          "en"
                        )}{" "}
                        HRK
                      </div>
                      <div style={{ fontSize: "20px" }}>
                        <label>
                          <strong>UKUPNO:</strong>
                        </label>{" "}
                        {parseFloat(currentOrder.totalCosts).toLocaleString(
                          "en"
                        )}{" "}
                        HRK
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {currentOrder.roleEditId === 8 ? (
                    <p style={{ color: "red", fontSize: "30px" }}>Plaćeno </p>
                  ) : (
                    <></>
                  )}
                </>
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
      {showingCosts && currentOrder ? (
        <EditCosts refreshList={refreshList} currentOrder={currentOrder} />
      ) : null}
    </>
  );
};

export default OrderList;
