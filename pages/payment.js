import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import StoreContext from "../context/store-context";
import { formatPrice } from "../utils/helper-functions";

const style = {
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

export const Payment = () => {
  const [order, setOrder] = useState();
  const { cart, completeCart, createCart } = useContext(StoreContext);

  useEffect(() => {
    if (cart.items.length > 0) {
      completeCart().then((order) => {
        setOrder(order);
        createCart();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !order ? (
    <div>
      <p>Hang on while we validate your payment...</p>
    </div>
  ) : (
    <div className="flex flex-col justify-center px-24 mx-auto max-w-[560px] min-h-screen mb-8">
      <div className="border-b-[1px] border-logo-100 mt-16">
        <h1>Order Summary</h1>
        <p>Thank you for your order!</p>
      </div>
      <div className="py-6 border-b-[1px] border-logo-100 mb-2">
        {order.items
          .sort((a, b) => {
            const createdAtA = new Date(a.created_at),
              createdAtB = new Date(b.created_at);

            if (createdAtA < createdAtB) return -1;
            if (createdAtA > createdAtB) return 1;
            return 0;
          })
          .map((i) => {
            return (
              <div key={i.id} className="mb-2">
                <div className="relative flex min-h-[120px] px-9 py-6">
                  <figure>
                    <Link
                      href={{
                        pathname: `/product/[id]`,
                        query: { id: i.variant.product.id },
                      }}
                      passHref
                    >
                      <a>
                        <div className="relative w-full h-full cursor-auto">
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
                          Price:{" "}
                          {formatPrice(i.unit_price, order.currency_code)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {i.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex items-center justify-around">
        <div className="flex justify-between py-2">
          <div className="mr-2">Subtotal</div>
          <div>{formatPrice(order.subtotal, order.region.currency_code)}</div>
        </div>
        <div className="flex justify-between py-2">
          <div className="mr-2">Shipping</div>
          <div>
            {formatPrice(order.shipping_total, order.region.currency_code)}
          </div>
        </div>
        <div
          className={`flex justify-between py-2 font-bold border-b-[1px] border-logo-100`}
        >
          <div className="mr-2">Total</div>
          <div>{formatPrice(order.total, order.region.currency_code)}</div>
        </div>
      </div>
      <div className="mt-4">
        <p>An order confirmation will be sent to you at {order.email}</p>
      </div>
    </div>
  );
};

export default Payment;
