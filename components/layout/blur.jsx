import React, { useContext } from "react";
import DisplayContext from "../../context/display-context";

const Blur = () => {
  const { cartView, updateCartViewDisplay } = useContext(DisplayContext);
  return (
    <div
      className={`absolute top-0 bottom-0 right-0 w-screen h-screen bg-black/50 opacity-0 invisible cursor-pointer transition-all duration-200 ease-in-out ${
        cartView ? "opacity-100 visible" : null
      }`}
      onClick={() => updateCartViewDisplay()}
      onKeyDown={() => updateCartViewDisplay()}
      role="button"
      tabIndex="-1"
      aria-label="Close cart view"
    />
  );
};

export default Blur;
