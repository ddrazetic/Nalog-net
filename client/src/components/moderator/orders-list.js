import React, { useEffect, useState } from "react";
import OrderDataService from "../../services/order.service";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import { toast } from "react-toastify";

const OrderList = (props) => {
  const [orders, setOrders] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  useEffect(() => {
    retrieveOrders();
    props.childFunc.current = refreshList; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const retrieveOrders = () => {
    OrderDataService.getAll()
      .then((response) => {
        setOrders(
          response.data.filter(
            (order) => order.nameModerator === props.currentUser.name
          )
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
  };
  const setActiveOrder = (order, index) => {
    setCurrentOrder(order);
    setCurrentIndex(index);
  };

  const notifyConfirmOrder = () =>
    toast("Potvrdili ste nalog i poslali ga direktoru na pregled!");

  const notifyRejectOrder = () => toast("Odbili ste nalog!");

  const notifyEditOrder = () =>
    toast("Vratili ste nalog nazad do djelatnika na izmjene!");

  const updateOrder = (roleEditId) => {
    OrderDataService.update(currentOrder.id, {
      ...currentOrder,
      roleEditId: roleEditId,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          refreshList();
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
      dataField: "nameWorker",
      text: "Ime podnositelja",
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
      setActiveOrder(row, row.id);
    },
  };

  const rowClasses = (row, rowIndex) => {
    if (row.id === currentIndex) return "active";
    if (row.roleEditId === 5) return "redRow ";
    if (row.roleEditId === 6) return "yellowRow ";
    if (row.roleEditId === 7) return "greenRow ";
    if (row.roleEditId === 8) return "grayRow ";
    if (row.roleEditId !== 2) return "opacityRow  ";
  };

  return (
    <>
      <div className="list row tableOrders">
        <div className="col-md-8 table-responsive ">
          <h4 className="h4">Lista naloga</h4>
          <BootstrapTable
            keyField="id"
            data={orders ? orders : []}
            columns={columns}
            // striped
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

              {currentOrder.roleEditId === 2 ? (
                <>
                  <button
                    className={`buttonAddOrder confirmButton  buttonAddOrderSmall smallMargin `}
                    onClick={() => {
                      updateOrder(3);
                      notifyConfirmOrder();
                    }}
                  >
                    Potvrdite nalog
                  </button>
                  <button
                    className={`buttonAddOrder  buttonAddOrderSmall smallMargin closeButton `}
                    onClick={() => {
                      updateOrder(5);
                      notifyRejectOrder();
                    }}
                  >
                    Odbijte nalog
                  </button>
                  <button
                    className={`buttonAddOrder  buttonAddOrderSmall smallMargin `}
                    onClick={() => {
                      updateOrder(1);
                      notifyEditOrder();
                    }}
                  >
                    Potrebne izmjene
                  </button>
                </>
              ) : (
                <p style={{ color: "red" }}>
                  Ovaj nalog se ne možete uređivati!
                </p>
              )}
              {currentOrder.roleEditId === 1 ? (
                <p>Zahtjev je poslan korisniku na izmjene. </p>
              ) : (
                <></>
              )}
              {currentOrder.roleEditId === 3 ? (
                <p>Zahtjev je proslijeđen direktoru na izmjene. </p>
              ) : (
                <></>
              )}
              {currentOrder.roleEditId === 5 ? (
                <p>Zahtjev je odbijen. </p>
              ) : (
                <></>
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
                    {parseFloat(currentOrder.travelCosts).toLocaleString("en")}{" "}
                    HRK
                  </div>
                  <div>
                    <label>
                      <strong>Ostali troškovi:</strong>
                    </label>{" "}
                    {parseFloat(currentOrder.otherCosts).toLocaleString("en")}{" "}
                    HRK
                  </div>
                  <div style={{ fontSize: "20px" }}>
                    <label>
                      <strong>UKUPNO:</strong>
                    </label>{" "}
                    {parseFloat(currentOrder.totalCosts).toLocaleString("en")}{" "}
                    HRK
                  </div>
                </>
              ) : (
                ""
              )}
              {currentOrder.roleEditId === 8 ? (
                <p style={{ color: "red", fontSize: "20px" }}>Plaćeno </p>
              ) : (
                <></>
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
    </>
  );
};

export default OrderList;
