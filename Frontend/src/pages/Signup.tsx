import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../modals/Modals";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AxiosWithAuth from "../api";

const Signup = () => {
  const [form, setForm] = useState<User>({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
    profileImage: null as File | null,
  });
  const api = AxiosWithAuth();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm({ ...form, profileImage: e.target.files[0] });
    }
  };

  const handleRegisterUser = async () => {
    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("isAdmin", form.isAdmin ? form.isAdmin.toString() : "");
      if (form.profileImage) {
        formData.append("profileImage", form.profileImage);
      }

      await api.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center  ">
      <div className="flex py-10 flex-col w-96 border p-10 gap-4 mt-20">
        <TextField
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Username"
          size="small"
          type="text"
          fullWidth
        />
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Role"
            onChange={(e) =>
              setForm({ ...form, isAdmin: e.target.value === "true" })
            }
          >
            <MenuItem value={"true"}>Admin</MenuItem>
            <MenuItem value={"false"}>User</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="file"
          onChange={(e) =>
            setForm({ ...form, profileImage: e.target.files?.[0] || null })
          }
          placeholder="Upload Image"
          size="small"
        />
        <div className="flex justify-center">
          <Button
            onClick={handleRegisterUser}
            className="w-48 "
            variant="outlined"
            size="small"
          >
            Signup
          </Button>
        </div>
        <p>
          Already have an Account? Go to <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
