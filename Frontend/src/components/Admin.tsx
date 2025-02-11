import React, { useEffect, useState } from "react";
import api from "../api";
import { Button } from "@mui/material";
import UsersTable from "./UsersTable";
import { ResponseUser } from "../modals/Modals";
import useAxiosWithAuth from "../api";

const Admin = () => {
  const api = useAxiosWithAuth();
  const [users, setUsers] = useState<ResponseUser[] | undefined>();

  const getUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default Admin;
