import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

export default function MenuAppBar() {
  const [anchorElManagement, setAnchorElManagement] =
    React.useState<null | HTMLElement>(null);
  const [anchorElProfile, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const user = getUserFromToken();

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleManagementMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElManagement(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };
  const handleManagementClose = () => {
    setAnchorElManagement(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const getUserProfile = async () => {
    navigate("/profile");
  };
  const getUsers = async () => {
    navigate("/admin");
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "cyan" }}>
      <AppBar
        position="fixed"
        className="bg-pink-500"
        style={{
          backgroundColor: "#443212",
          color: "white",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <div className="flex gap-5 justify-center items-center">
            <Typography>
              <Link to="/dashboard">Dashboard</Link>{" "}
            </Typography>
            {user?.isAdmin && (
              <Typography>
                <Link to={"/add-product"}>Add-Product</Link>
              </Typography>
            )}
            <Typography>
              <Link to="/cart">Cart</Link>{" "}
            </Typography>
            {user?.isAdmin && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleManagementMenu}
                  color="inherit"
                >
                  <Typography>Management</Typography>
                </IconButton>
                <Menu
                  className="mt-10"
                  id="menu-appbar"
                  anchorEl={anchorElManagement}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElManagement)}
                  onClose={handleManagementClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleManagementClose();
                      getUsers();
                    }}
                  >
                    Users
                  </MenuItem>
                </Menu>
              </div>
            )}
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                className="mt-10"
                id="menu-appbar"
                anchorEl={anchorElProfile}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElProfile)}
                onClose={handleProfileClose}
              >
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    getUserProfile();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    handleLogout();
                  }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
