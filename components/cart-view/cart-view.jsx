import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import { formatPrice, quantity, sum } from "../../utils/helper-functions";
import { formatPrices } from "../../utils/prices";

const CartView = () => {
  const { cartView, updateCartViewDisplay, updateCheckoutStep } =
    useContext(DisplayContext);
  const { cart, currencyCode, updateLineItem, removeLineItem } =
    useContext(StoreContext);
  const router = useRouter();

  return (
    <div
      className={`fixed min-w-[460px] h-screen max-h-screen shadow-lg bg-white z-20 flex flex-col overflow-hidden justify-between -right-[460px] top-0 translate-x-[110%] ${
        cartView ? "translate-x-[-460px]" : null
      }`}
    >
      <div className="flex items-center justify-between py-4 px-9">
        <p>Bag</p>
        <p>
          {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}{" "}
          {cart.items.length > 0 && cart.items.map(quantity).reduce(sum) === 1
            ? "item"
            : "items"}
        </p>
        <button
          className="bg-transparent border-none cursor-pointer"
          onClick={() => updateCartViewDisplay()}
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
              <div key={i.id} className="px-9 py-6 relative min-h-[120px] flex">
                <figure
                  className="w-32 h-48 mr-4 bg-bg"
                  onClick={() => updateCartViewDisplay()}
                >
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
                    </div>
                    <div>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <button
                            className="text-gray-600 transition-colors duration-100 ease-in bg-transparent border-none cursor-pointer hover:text-logo-900"
                            onClick={() =>
                              updateLineItem({
                                lineId: i.id,
                                quantity: i.quantity - 1,
                              })
                            }
                          >
                            {"–"}
                          </button>
                          <p className="w-4 text-center">{i.quantity}</p>
                          <button
                            className="text-gray-600 transition-colors duration-100 ease-in bg-transparent border-none cursor-pointer hover:text-logo-900"
                            onClick={() =>
                              updateLineItem({
                                lineId: i.id,
                                quantity: i.quantity + 1,
                              })
                            }
                          >
                            {"+"}
                          </button>
                        </div>
                      </div>
                      <p>{}</p>
                    </div>
                  </div>
                  <button
                    className="text-left text-gray-400 underline transition-colors duration-100 ease-in bg-transparent border-none cursor-pointer hover:text-logo-900"
                    onClick={() => removeLineItem(i.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex items-center justify-between py-4 px-9">
        <p>Subtotal (incl. taxes)</p>
        <span>
          {cart.region ? formatPrice(cart.subtotal, currencyCode) : 0}
        </span>
      </div>
      <div className="py-4 px-9">
        <button
          className="w-full text-lg min-h-[3rem] py-2 self-center inline-flex items-center justify-center bg-logo-900 text-white rounded-lg transition-colors ease-in duration-200 hover:bg-logo-1000 cursor-pointer border-none font-medium"
          onClick={() => {
            updateCheckoutStep(1);
            updateCartViewDisplay();
            router.push("/checkout");
          }}
          disabled={cart.items.length < 1 ? true : false}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartView;
