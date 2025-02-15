import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AxiosWithAuth from "../api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const api = AxiosWithAuth();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const response = await api.post("/auth/login", form);
    localStorage.setItem("authToken", response.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center  ">
      <div className="flex py-10 flex-col rounded-md w-96 border p-10 gap-4 mt-20">
        <TextField
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          size="small"
          type="email"
          fullWidth
        />
        <TextField
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          type="password"
          size="small"
        />
        <div className="flex justify-center">
          <Button
            className="bg-pink"
            fullWidth
            onClick={handleLogin}
            variant="contained"
            size="small"
            style={{ backgroundColor: "peru" }}
          >
            Login
          </Button>
        </div>
        <div>
          <p className="text-sm text-center mt-10">
            Don't hava an Account?{" "}
            <a href="/register" className="text-blue-500 ">
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
