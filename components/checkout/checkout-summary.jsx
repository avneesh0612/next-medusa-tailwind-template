import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { PuffLoader } from "react-spinners";
import DisplayContext from "../../context/display-context";
import { formatPrice, quantity, sum } from "../../utils/helper-functions";
import { formatPrices } from "../../utils/prices";

const CheckoutSummary = ({ cart }) => {
  const { orderSummary, updateOrderSummaryDisplay } =
    useContext(DisplayContext);

  return cart ? (
    <div
      className={`fixed w-2/5 h-screen max-h-screen shadow-lg bg-white z-20 flex flex-col overflow-hidden justify-between right-0 top-0 ${
        orderSummary ? "translate-y-0" : ""
      }`}
    >
      <div className="flex items-center justify-center py-4 px-9">
        <p className="text-lg font-semibold">Order Summary</p>
        <p>
          {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}{" "}
          {cart.items.length > 0 && cart.items.map(quantity).reduce(sum) === 1
            ? "item"
            : "items"}
        </p>
        <button
          className="block bg-transparent border-none cursor-pointer md:hidden"
          onClick={() => updateOrderSummaryDisplay()}
        >
          X
        </button>
      </div>
      <div className="overview">
        {cart.items
          .sort((a, b) => {
            const createdAtA = new Date(a.created_at),
              createdAtB = new Date(b.created_at);

            if (createdAtA < createdAtB) return -1;
            if (createdAtA > createdAtB) return 1;
            return 0;
          })
          .map((i) => {
            return (
              <div key={i.id} className="py-4 px-9 relative min-h-[120px] flex">
                <figure>
                  <Link
                    href={{
                      pathname: `/product/[id]`,
                      query: { id: i.variant.product.id },
                    }}
                    passHref
                  >
                    <a>
                      <div className="relative w-full h-full cursor-pointer">
                        <Image
                          objectFit="cover"
                          height="100%"
                          width="100%"
                          src={i.variant.product.thumbnail}
                          alt={`${i.title}`}
                        />
                      </div>
                    </a>
                  </Link>
                </figure>
                <div className="flex flex-col justify-around">
                  <div>
                    <div>
                      <Link
                        href={{
                          pathname: `/product/[id]`,
                          query: { id: i.variant.product.id },
                        }}
                        passHref
                      >
                        <a>{i.title}</a>
                      </Link>
                      <p className="text-sm text-gray-600">
                        Size: {i.variant.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: {formatPrices(cart, i.variant)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {i.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex items-center justify-between py-2 px-9">
        <p className="mr-2">Subtotal (incl. taxes)</p>
        <span>
          {cart.region
            ? formatPrice(cart.subtotal, cart.region.currency_code)
            : 0}
        </span>
      </div>
      <div className="flex items-center justify-between py-2 px-9">
        <p className="mr-2">Shipping</p>
        <span>
          {cart.region
            ? formatPrice(cart.shipping_total, cart.region.currency_code)
            : 0}
        </span>
      </div>
      <div className="flex items-center justify-between py-2 px-9">
        <p className="mr-2">Total</p>
        <span>
          {cart.region ? formatPrice(cart.total, cart.region.currency_code) : 0}
        </span>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-screen">
      <PuffLoader />
    </div>
  );
};

export default CheckoutSummary;
