import { Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../modals/Modals";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AxiosWithAuth from "../api";

const UserInfo = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const { id } = useParams();
  const api = AxiosWithAuth();

  const getUserInfo = async () => {
    const response = await api.get(`/auth/user/${id}`);
    setUser(response.data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="flex justify-center ">
      <div
        style={{ height: "500px", width: "700px" }}
        className="flex bg-gray-300 rounded-md gap-1 my-5 flex-col items-center"
      >
        <h1 className="text-3xl text-blue-900 font-bold mt-10 ">
          User Profile
        </h1>
        <div className="w-full h-1 mb-10 bg-stone-500 "></div>
        <Avatar
          style={{
            height: 100,
            width: 100,
            backgroundColor: "peru",
            fontSize: "24px",
          }}
          alt="Gray Bakari"
        >
          {user?.username
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </Avatar>
        <div className="flex flex-col gap-5 text-lg">
          <h1 className="flex gap-10">
            <span className="font-bold">User Name:</span>{" "}
            <span className="text-blue-900">{user?.username}</span>
          </h1>
          <h1 className="flex gap-20">
            <span className="font-bold">Email:</span>{" "}
            <span className="text-blue-900">{user?.email}</span>
          </h1>
        </div>
        <div className="mt-12">
          <Button
            variant="outlined"
            style={{ color: "white", backgroundColor: "peru" }}
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default UserInfo;
