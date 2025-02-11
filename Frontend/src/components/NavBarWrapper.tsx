import React from "react";
import MenuAppBar from "./MenuAppBar";
import { Outlet } from "react-router-dom";

const NavBarWrapper = () => {
  return (
    <>
      <MenuAppBar />
      <Outlet />
    </>
  );
};

export default NavBarWrapper;
