import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function MenuAppBar() {
  const [anchorElProfile, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);
  const [anchorElManagement, setAnchorElManagement] =
    React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = getUserFromToken();
  const { theme, toggleTheme } = useTheme();

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

  const getUserProfile = () => navigate("/profile");
  const getUsers = () => navigate("/admin");

  // Toggle Mobile Drawer
  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  // Navigation links
  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Cart", path: "/cart" },
    ...(user?.isAdmin ? [{ label: "Add Product", path: "/add-product" }] : []),
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#443212",
          color: "white",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo or Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Shop
          </Typography>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex", alignItems: "center" },
              gap: 3,
            }}
          >
            {navLinks.map((link) => (
              <Typography key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </Typography>
            ))}

            {/* Management Dropdown for Admins */}
            {user?.isAdmin && (
              <div>
                <IconButton
                  // size="large"
                  aria-label="management"
                  aria-controls="management-menu"
                  aria-haspopup="true"
                  onClick={handleManagementMenu}
                  color="inherit"
                >
                  <Typography>Management</Typography>
                </IconButton>
                <Menu
                  id="management-menu"
                  anchorEl={anchorElManagement}
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
          </Box>

          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} color="inherit">
            {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
          </IconButton>

          {/* Profile Menu */}
          <IconButton size="large" onClick={handleProfileMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorElProfile}
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
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem
                sx={{ cursor: "pointer" }}
                key={link.path}
                component={Link}
                to={link.path}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}

            {/* Management Section in Mobile Drawer */}
            {user?.isAdmin && (
              <>
                <Typography
                  sx={{ ml: 2, mt: 2, fontWeight: "norma", cursor: "pointer" }}
                >
                  Management
                </Typography>
                <ListItem
                  sx={{ cursor: "pointer", marginLeft: 2 }}
                  onClick={getUsers}
                >
                  <ListItemText primary="Users" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
