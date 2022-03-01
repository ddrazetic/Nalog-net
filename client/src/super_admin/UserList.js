import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
// import { ReferenceManyToManyField } from "@react-admin/ra-many-to-many";
function UserList(props) {
  // console.log({ ...props });
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="username" />
        <TextField source="email" />
        <TextField source="roles.name" label="Role" />
        <TextField source="roles.user_roles.roleId" label="roleUserId" />

        <EditButton basePath="/users" />
        <DeleteButton basePath="/users" />
      </Datagrid>
    </List>
  );
}

export default UserList;
