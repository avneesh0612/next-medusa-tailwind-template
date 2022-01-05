import { useContext, useState } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import CheckoutSummary from "./checkout-summary";
import InformationStep from "./information-step";
import PaymentStep from "./payment-step";
import ShippingStep from "./shipping-step";
import StepOverview from "./step-overview";

const CheckoutStep = () => {
  const { checkoutStep, updateCheckoutStep, updateOrderSummaryDisplay } =
    useContext(DisplayContext);
  const { cart, updateAddress, setShippingMethod } = useContext(StoreContext);

  const [isProcessingInfo, setIsProcessingInfo] = useState(false);
  const [isProcessingShipping, setIsProcessingShipping] = useState(false);

  const handleShippingSubmit = async (address, email) => {
    setIsProcessingInfo(true);

    await updateAddress(address, email);

    setIsProcessingInfo(false);
    updateCheckoutStep(2);
  };

  const handleDeliverySubmit = async (option) => {
    setIsProcessingShipping(true);
    await setShippingMethod(option.id)
      .then(() => {
        updateCheckoutStep(3);
      })
      .finally(() => {
        setIsProcessingShipping(false);
      });
  };

  const handleStep = () => {
    switch (checkoutStep) {
      case 1:
        return (
          <InformationStep
            isProcessing={isProcessingInfo}
            savedValues={{
              ...cart.shipping_address,
              email: cart.email,
              country: cart.region?.countries.find(
                (country) =>
                  country.iso_2 === cart.shipping_address?.country_code
              )?.display_name,
            }}
            handleSubmit={(submittedAddr, submittedEmail) =>
              handleShippingSubmit(submittedAddr, submittedEmail)
            }
          />
        );
      case 2:
        return (
          <ShippingStep
            isProcessing={isProcessingShipping}
            cart={cart}
            handleDeliverySubmit={handleDeliverySubmit}
            savedMethods={cart.shipping_methods}
          />
        );
      case 3:
        return <PaymentStep />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="flex flex-col w-3/5 h-screen px-5 py-0 overflow-y-scroll md:pt-28 md:pr-20 md:pb-7">
        <div className="flex mt-24 mb-5 md:mt-0">
          <p
            className={`mx-1 text-gray-600 transition-colors duration-200 ease-in ${
              checkoutStep === 1 && "text-black"
            }`}
          >
            Information
          </p>
          <p>/</p>
          <p
            className={`mx-1 text-gray-600 transition-colors duration-200 ease-in ${
              checkoutStep === 1 && "text-black"
            }`}
          >
            Delivery
          </p>
          <p>/</p>
          <p
            className={`mx-1 text-gray-600 transition-colors duration-200 ease-in ${
              checkoutStep === 1 && "text-black"
            }`}
          >
            Payment
          </p>
        </div>
        {checkoutStep !== 1 ? <StepOverview /> : null}
        {handleStep()}
        <button
          className="w-full text-base min-h-[3rem] mb-8 md:mb-0 block py-2 self-center md:inline-flex items-center justify-center bg-transparent text-white font-bold rounded-lg hover:bg-logo-100"
          onClick={() => updateOrderSummaryDisplay()}
        >
          View Order Summary
        </button>
      </div>
      <div className="flex flex-col w-2/5">
        <CheckoutSummary cart={cart} />
      </div>
    </div>
  );
};

export default CheckoutStep;
