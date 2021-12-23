import React from "react";
import { Edit, SimpleForm, SelectInput } from "react-admin";
const UserEdit = (props) => {
  return (
    <div>
      <Edit {...props}>
        <SimpleForm>
          <SelectInput
            source="roleId"
            choices={[
              { id: "1", name: "User" },
              { id: "2", name: "Moderator" },
              { id: "3", name: "Admin" },
            ]}
          />
        </SimpleForm>
      </Edit>
    </div>
  );
};

export default UserEdit;
