import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import StoreContext from "../../context/store-context";
import getStripe from "../../utils/stripe";
import InjectablePaymentCard from "./injectable-payment-card";

const PaymentStep = () => {
  const router = useRouter();
  const { cart, createPaymentSession, setPaymentSession } =
    useContext(StoreContext);

  useEffect(() => {
    createPaymentSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePayment = async () => {
    await setPaymentSession("manual");
    router.push(`/payment`);
  };

  return (
    <div style={{ flexGrow: "1" }}>
      {cart &&
        cart.payment_sessions &&
        cart.payment_sessions.map((ps) => {
          switch (ps.provider_id) {
            case "stripe":
              return (
                <Elements key={"stripe"} stripe={getStripe()}>
                  <h2>Stripe Payment</h2>
                  <InjectablePaymentCard
                    session={ps}
                    onSetPaymentSession={() => setPaymentSession("stripe")}
                  />
                </Elements>
              );
            case "manual":
              return (
                <div key={"manual"}>
                  <h2>Test Payment</h2>
                  <button
                    onClick={handlePayment}
                    className="min-h-[3rem] text-lg min-w-[3rem] py-2 px-5 self-center inline-flex items-center bg-logo-900 text-white rounded-lg ease-in duration-200 transition-colors hover:bg-logo-1000 font-medium"
                    id="submit"
                  >
                    <span id="button-text">Pay</span>
                  </button>
                </div>
              );
            default:
              return null;
          }
        })}
    </div>
  );
};

export default PaymentStep;
