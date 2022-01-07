import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { BiShoppingBag } from "react-icons/bi";
import StoreContext from "../../context/store-context";
import { formatPrice, resetOptions } from "../../utils/helper-functions";
import { createClient } from "../../utils/client";
import { formatPrices } from "../../utils/prices";

const Product = ({ product }) => {
  const { addVariantToCart, cart } = useContext(StoreContext);
  const [options, setOptions] = useState({
    variantId: "",
    quantity: 0,
    size: "",
  });

  useEffect(() => {
    if (product) {
      setOptions(resetOptions(product));
    }
  }, [product]);

  const handleQtyChange = (action) => {
    if (action === "inc") {
      if (
        options.quantity <
        product.variants.find(({ id }) => id === options.variantId)
          .inventory_quantity
      )
        setOptions({
          variantId: options.variantId,
          quantity: options.quantity + 1,
          size: options.size,
        });
    }
    if (action === "dec") {
      if (options.quantity > 1)
        setOptions({
          variantId: options.variantId,
          quantity: options.quantity - 1,
          size: options.size,
        });
    }
  };

  const handleAddToBag = () => {
    addVariantToCart({
      variantId: options.variantId,
      quantity: options.quantity,
    });
    if (product) setOptions(resetOptions(product));
  };

  return (
    <div className="flex w-full min-h-screen">
      <figure className="w-3/5 h-screen">
        <div className="relative w-full h-full bg-bg">
          <Image
            objectFit="cover"
            layout="fill"
            src={product.thumbnail}
            alt={`${product.title}`}
          />
        </div>
      </figure>
      <div className="flex flex-col justify-center px-12 py-2">
        <span />
        <div>
          <div className="title">
            <h1>{product.title}</h1>
          </div>
          <p className="price">{formatPrices(cart, product.variants[0])}</p>
          <div className="my-8">
            <p className="mb-3">Select Size</p>
            <div className="selectors">
              {product.variants
                .slice(0)
                .reverse()
                .map((v) => {
                  return (
                    <button
                      key={v.id}
                      className={`p-3 border-none bg-gray-300 rounded-sm min-h-[2rem] min-w-[2rem] mr-2 transition-all duration-100 ease-in hover:brightness-95 filter ${
                        v.title === options.size
                          ? "bg-logo-900 text-white"
                          : null
                      }`}
                      onClick={() =>
                        setOptions({
                          variantId: v.id,
                          quantity: options.quantity,
                          size: v.title,
                        })
                      }
                    >
                      {v.title}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="my-8">
            <p className="mb-3">Select Quantity</p>
            <div className="flex items-center">
              <button
                className="w-10 h-10 transition-all duration-200 ease-in border-none rounded-sm hover:bg-logo-100 focus:bg-logo-100"
                onClick={() => handleQtyChange("dec")}
              >
                -
              </button>
              <span className="flex items-center justify-center text-center w-9 h-9">
                {options.quantity}
              </span>
              <button
                className="w-10 h-10 transition-all duration-200 ease-in border-none rounded-sm hover:bg-logo-100 focus:bg-logo-100"
                onClick={() => handleQtyChange("inc")}
              >
                +
              </button>
            </div>
          </div>
          <button
            className="flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-logo-1000"
            onClick={() => handleAddToBag()}
          >
            <span>Add to bag</span>
            <BiShoppingBag className="w-6 h-6 text-white fill-current" />
          </button>
          <div className="mt-8 max-w-[500px]">
            <div className="tab-titles">
              <button className="py-2 text-base border-n-[1px] border-logo-400  border-none bg-transparent">
                Product Description
              </button>
            </div>
            <div className="tab-content">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//create a Medusa client
const client = createClient();

export async function getStaticPaths() {
  // Call an external API endpoint to get products
  const { products } = await client.products.list();

  // Get the paths we want to pre-render based on the products
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the product `id`.
  // If the route is like /product/prod_1, then params.id is 1
  const { product } = await client.products.retrieve(params.id);

  // Pass post data to the page via props
  return { props: { product } };
}

export default Product;
