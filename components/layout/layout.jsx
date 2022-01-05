import React, { useContext } from "react";
import NavBar from "./nav-bar";
import Blur from "./blur";
import CartView from "../cart-view/cart-view";
import DisplayContext from "../../context/display-context";

const Layout = ({ children }) => {
  const { cartView } = useContext(DisplayContext);

  return (
    <div className={cartView ? "h-screen overflow-hidden" : null}>
      <CartView />
      <Blur />
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
