import Link from "next/link";
import { createClient } from "../utils/client";
import { FaGithub } from "react-icons/fa";
import { formatPrices } from "../utils/prices";
import { useContext } from "react";
import StoreContext from "../context/store-context";

export default function Home({ products }) {
  const { cart } = useContext(StoreContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-20">
      <main className="flex flex-col items-center justify-center py-20">
        <div className="text-left space-y-4 max-w-[800px]">
          <h1 className="text-2xl">
            <span className="font-bold">Medusa + Next.js Starter</span>{" "}
            <span role="img" aria-label="Rocket emoji">
              🚀
            </span>
          </h1>
          <p className="text-lg">
            Build blazing-fast client applications on top of a modular headless
            commerce engine. Integrate seamlessly with any 3rd party tools for a
            best-in-breed commerce stack.
          </p>
          <div className="flex items-center mb-12 flex-nowrap">
            <div className="p-3 mr-4 text-sm bg-gray-300 rounded-md">
              v{process.env.NEXT_PUBLIC_APP_VERSION}
            </div>
            <a
              href="https://www.medusa-commerce.com/"
              arget="_blank"
              rel="noreferrer"
              role="button"
            >
              <div className="p-3 mr-4 text-sm text-white rounded-md bg-logo-900">
                Medusa
              </div>
            </a>
            <a
              href="https://nextjs.org/docs/getting-started"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className="p-3 mr-4 text-sm rounded-md"
                style={{ background: "#111111", color: "white" }}
              >
                Next.js
              </div>
            </a>
            <a
              href="https://stripe.com/docs"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className="p-3 mr-4 text-sm rounded-md"
                style={{ background: "#4379FF", color: "white" }}
              >
                Stripe
              </div>
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://docs.medusa-commerce.com/"
              target="_blank"
              rel="noreferrer"
              role="button"
              className="min-h-[3rem] text-lg min-w-[3rem] py-2 px-5 self-center inline-flex items-center bg-logo-900 text-white rounded-lg ease-in duration-200 transition-colors hover:bg-logo-1000 font-medium"
            >
              Read the docs
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
              </svg>
            </a>
            <a
              href="https://github.com/avneesh0612/next-medusa-tailwind-template"
              target="_blank"
              rel="noreferrer"
              role="button"
              className="min-h-[3rem] text-lg min-w-[3rem] py-2 px-5 self-center inline-flex items-center bg-logo-900 text-white rounded-lg ease-in duration-200 transition-colors hover:bg-logo-1000 font-medium ml-5"
            >
              View on GitHub
              <FaGithub className="w-6 h-6 ml-2" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start w-full mr-12">
          <h2>Demo Products</h2>
          <div className="flex flex-wrap items-center justify-center">
            {products &&
              products.map((p) => {
                return (
                  <div
                    key={p.id}
                    className="mr-4 p-6 text-left border-gray-300 border-[1px] rounded-xl hover:text-logo-900 hover:border-logo-900 focus:text-logo-900 focus:border-logo-900 m-5 transition duration-100 delay-75"
                  >
                    <Link
                      href={{ pathname: `/product/[id]`, query: { id: p.id } }}
                      passHref
                    >
                      <a>
                        <div>
                          <h2 className="mb-2 text-xl">{p.title}</h2>
                          <p>{formatPrices(cart, p.variants[0])}</p>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const { products } = await client.products.list();

  return {
    props: {
      products,
    },
  };
};
