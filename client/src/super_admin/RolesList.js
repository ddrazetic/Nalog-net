import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
function RolesList(props) {
  // console.log({ ...props });
  return (
    <List {...props}>
      <Datagrid>
        {/* <TextField source="id" />
        <TextField source="name" />
        <EditButton basePath="/rolestype" /> */}
        <TextField source="userId" />
        <TextField source="roleId" />
        <EditButton basePath="/role" />
      </Datagrid>
    </List>
  );
}

export default RolesList;
