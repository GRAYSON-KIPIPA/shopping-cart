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
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const api = useAxiosWithAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const getUser = async () => {
    const response = await api.get("/auth/profile");
    setUser(response.data);
  };

  const editProfile = async (id: string | undefined) => {
    try {
      await api.put(`/auth/user/${id}`, user);
      setTimeout(() => {
        setIsSuccess(true);
      }, 2000);
    } catch (error) {
      console.error("Error Updating profile", error);
      setTimeout(() => {
        setIsError(true);
      }, 2000);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold m-5">EDIT PROFILE</h1>
      <div className="flex justify-center items-center px-16 py-5 rounded-md flex-col border border-stone-900 ">
        <div className="flex flex-col gap-2 text-gray-500 w-96">
          <label htmlFor="">User Name</label>
          <TextField
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <TextField name="email" value={user.email} onChange={handleChange} />
          <label htmlFor="">Password</label>
          <TextField name="password" type="password" onChange={handleChange} />
        </div>
        <div className="mt-10 px-10">
          <Button variant="outlined" onClick={() => editProfile(user?._id)}>
            save
          </Button>
        </div>
        {isSuccess && (
          <span className="text-lime-500 text-center">
            User profile updated successfully
          </span>
        )}
        {isError && (
          <span className="text-red-500 text-center">
            Failed updating the user profile
          </span>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
