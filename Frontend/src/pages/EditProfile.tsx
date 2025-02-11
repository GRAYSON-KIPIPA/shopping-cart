import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../modals/Modals";
import useAxiosWithAuth from "../api";

const EditProfile = () => {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const api = useAxiosWithAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const getUser = async () => {
    const response = await api.get("/auth/profile");
    setUser(response.data);
  };

  const editProfile = async (id: string | undefined) => {
    await api.put(`/auth/user/${id}`, user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold m-10">EDIT PROFILE</h1>
      <div className="flex justify-center items-center p-10 rounded-md flex-col border border-stone-900 ">
        <div className="flex flex-col gap-10 w-96">
          <TextField
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <TextField name="email" value={user.email} onChange={handleChange} />
          <TextField
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="mt-10 px-10">
          <Button variant="outlined" onClick={() => editProfile(user?._id)}>
            EDIT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
