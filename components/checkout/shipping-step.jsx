import { useContext, useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { MdError } from "react-icons/md";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import { isEmpty } from "../../utils/helper-functions";
import ShippingMethod from "./shipping-method";

const ShippingStep = ({ handleDeliverySubmit, isProcessing, cart }) => {
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [error, setError] = useState(false);

  const { getShippingOptions } = useContext(StoreContext);
  const { updateCheckoutStep } = useContext(DisplayContext);

  useEffect(() => {
    // Wait until the customer has entered their address information
    if (!cart.shipping_address?.country_code) {
      return;
    }

    getShippingOptions().then((partitioned) => {
      setShippingOptions(partitioned);
    });

    //if method is already selected, then preselect
    if (cart.shipping_methods.length > 0) {
      setSelectedOption(cart.shipping_methods[0].shipping_option);
    }
  }, [cart, setSelectedOption, getShippingOptions]);

  const handleSelectOption = (o) => {
    setSelectedOption(o);

    if (error) {
      setError(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setError(true);
    } else {
      handleDeliverySubmit(selectedOption);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-16 h-[530px]">
      <div className="flex flex-col items-center space-y-3">
        <h2>Delivery</h2>
        {isEmpty(shippingOptions) || isProcessing ? (
          <div>loading...</div>
        ) : (
          <div className="flex space-x-4">
            {shippingOptions.map((so) => {
              return (
                <div key={so.id}>
                  <ShippingMethod
                    option={so}
                    chosen={selectedOption}
                    handleOption={handleSelectOption}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div
        className={`flex opacity-0 invisible items-center transition-all duration-100 ease-in text-[#db5461] ${
          error ? "opacity-100 visible" : ""
        } `}
      >
        <MdError />
        <p className="mr-2">Select a shipping method</p>
      </div>
      <div className="flex flex-col items-center justify-between space-y-2">
        <button
          className="flex items-center text-base bg-transparent border-none"
          onClick={() => updateCheckoutStep(1)}
        >
          Back to information
        </button>
        <button
          className="w-full text-lg min-h-[3rem] py-2 self-center inline-flex items-center justify-center bg-logo-900 text-white rounded-lg transition-colors ease-in duration-200 hover:bg-logo-1000 cursor-pointer border-none font-medium"
          onClick={handleSubmit}
        >
          <span id="button-text">Next</span>
        </button>
      </div>
    </div>
  );
};

export default ShippingStep;
