import React from "react";
import { Admin, Resource } from "react-admin";
import UserList from "./UserList.js";
import simpleRestProvider from "ra-data-simple-rest";
import UserEdit from "./UserEdit";
import { Link } from "react-router-dom";
import { authProvider } from "./authProvider";

const SuperAdmin = () => {
  return (
    <div>
      <Link
        style={{
          color: "white",
          position: "fixed",
          zIndex: "999",
          right: "0",
          bottom: "0",
          padding: "10px",
          backgroundColor: "rgba(33,150,243,255)",
          fontWeight: "600",
        }}
        to="/"
      >
        HOME
      </Link>
      <Admin
        dataProvider={simpleRestProvider("http://localhost:8080")}
        authProvider={authProvider}
      >
        <Resource name="users" list={UserList} edit={UserEdit} />
      </Admin>
    </div>
  );
};

export default SuperAdmin;
