import React, { useEffect, useState } from "react";
import OrderDataService from "../../services/order.service";
// import EditOrder from "./edit-order.component";
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
    // document.querySelectorAll(".buttonAddOrder").inner("style", `color:red`);
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
    setShowing(false);
  };
  const setActiveOrder = (order, index) => {
    setCurrentOrder(order);
    setCurrentIndex(index);

    setShowing(false);
  };

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
    if (row.roleEditId === 5) return "redRow ";
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
            striped
            bordered
            hover
            responsive="sm"
            pagination={paginationFactory()}
            rowEvents={rowEvents}
            rowClasses={rowClasses}
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
              {/* OVO SE TREBA PROMIJENITI U 2 KASNIJE */}
              {currentOrder.roleEditId === 2 ||
              currentOrder.roleEditId === 5 ? (
                <>
                  <button
                    className={`buttonAddOrder confirmButton  buttonAddOrderSmall smallMargin `}
                    onClick={() => {
                      updateOrder(3);
                      // console.log(currentOrder.roleEditId);
                    }}
                  >
                    Potvrdite nalog
                  </button>
                  <button
                    className={`buttonAddOrder  buttonAddOrderSmall smallMargin closeButton `}
                    onClick={() => {
                      updateOrder(5);
                      // console.log(currentOrder.roleEditId);
                    }}
                  >
                    Odbijte nalog
                  </button>
                  <button
                    className={`buttonAddOrder  buttonAddOrderSmall smallMargin `}
                    onClick={() => {
                      updateOrder(1);
                      // console.log(currentOrder.roleEditId);
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
            </div>
          ) : (
            <div>
              <br />
              <p>Kliknite na nalog...</p>
            </div>
          )}
        </div>
      </div>
      {/* {showing && currentOrder ? (
        <EditOrder refreshList={refreshList} currentOrder={currentOrder} />
      ) : null} */}
    </>
  );
};

export default OrderList;
