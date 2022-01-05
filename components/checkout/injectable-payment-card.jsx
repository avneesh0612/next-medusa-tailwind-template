import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";

const InjectablePaymentCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { cart, completeCart } = useContext(StoreContext);
  const { updateCheckoutStep } = useContext(DisplayContext);

  const router = useRouter();

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(
      cart.payment_session.data.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );
    if (payload.error) {
      setError(`${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      router.push(`/payment`);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        className="p-8 bg-white rounded-lg shadow-lg"
        id="card-element"
        onChange={handleChange}
      />
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <div className="flex items-center justify-between mt-8">
        <button
          className="flex items-center text-base bg-transparent border-none"
          onClick={() => updateCheckoutStep(2)}
        >
          <BiLeftArrowAlt className="mr-2" /> Back to shipping method
        </button>
        <button
          className="text-lg min-h-[3rem] min-w-[3rem] py-2 px-5 self-center inline-flex items-center bg-logo-900 text-white border-none transition-colors ease-in duration-200"
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">{processing ? "Processing" : "Pay"}</span>
        </button>
      </div>
    </form>
  );
};

export default InjectablePaymentCard;
