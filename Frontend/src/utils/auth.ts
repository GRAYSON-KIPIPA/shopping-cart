import { jwtDecode } from "jwt-decode";
import { JwtDecode } from "../modals/Modals";

export const getUserFromToken = () => {
  const token = localStorage.getItem("authToken");

  if (!token) return null;
  try {
    const decoded: JwtDecode = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
