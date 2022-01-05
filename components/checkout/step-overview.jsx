import { useContext } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";

const StepOverview = () => {
  const { cart } = useContext(StoreContext);
  const { checkoutStep, updateCheckoutStep } = useContext(DisplayContext);

  return (
    <div>
      <h2>Steps</h2>
      <div>
        {cart?.shipping_address ? (
          <>
            <div className="flex items-center p-8 mb-2 text-sm text-gray-600 bg-white rounded-lg shadow-lg">
              <span className="w-20 font-semibold">Contact </span>
              <div className="min-w-0 mr-3 overflow-hidden whitespace-nowrap text-ellipsis">
                {cart.shipping_address.first_name}{" "}
                {cart.shipping_address.last_name}
              </div>
              <button
                className="px-4 py-2 transition-colors duration-200 ease-in bg-transparent border-none rounded hover:bg-logo-100"
                onClick={() => updateCheckoutStep(1)}
              >
                Edit
              </button>
            </div>
            <div className="flex items-center p-8 mb-2 text-sm text-gray-600 bg-white rounded-lg shadow-lg">
              <span className="w-20 font-semibold">Address</span>
              <div className="min-w-0 mr-3 overflow-hidden whitespace-nowrap text-ellipsis">
                {cart.shipping_address.address_1}, {cart.shipping_address.city}
              </div>
              <button
                className="px-4 py-2 transition-colors duration-200 ease-in bg-transparent border-none rounded hover:bg-logo-100"
                onClick={() => updateCheckoutStep(1)}
              >
                Edit
              </button>
            </div>
          </>
        ) : null}
        {cart?.shipping_methods[0] && checkoutStep !== 2 ? (
          <div className="flex items-center p-8 mb-2 text-sm text-gray-600 bg-white rounded-lg shadow-lg">
            <span className="w-20 font-semibold">Shipping</span>
            <div className="min-w-0 mr-3 overflow-hidden whitespace-nowrap text-ellipsis">
              {cart.shipping_methods[0].shipping_option.name}
            </div>
            <button
              className="px-4 py-2 transition-colors duration-200 ease-in bg-transparent border-none rounded hover:bg-logo-100"
              onClick={() => updateCheckoutStep(2)}
            >
              Edit
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StepOverview;
