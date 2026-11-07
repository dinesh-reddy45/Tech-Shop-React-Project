
import { Link } from "react-router-dom";
import productsData from "../data/productsData";
function RelatedProducts({ currentProductId }) {
  const relatedProducts = productsData
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  return (
    <section className="bg-[#141414] px-4 py-16 text-gray-300 sm:px-6 lg:px-8">

      <h2 className="mb-16 text-center text-2xl font-bold">
        Related Products
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">

        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-sm border border-gray-700 transition hover:border-gray-500"
          >

            {/* Product Image */}
            <Link to={`/productsdetails/${product.id}`}>
              <div className="flex h-36 items-center justify-center bg-[#181818] p-3 sm:h-44">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-contain transition duration-300 hover:scale-105"
                />
              </div>
            </Link>

            {/* Product Details */}
            <div className="p-3">

              <div className="mb-2 text-sm tracking-wide text-red-600">
                {"★".repeat(product.rateCount)}
                <span className="text-gray-600">
                  {"★".repeat(5 - product.rateCount)}
                </span>
              </div>

              <Link>
                <h3 className="truncate text-sm font-bold text-gray-300 hover:text-white sm:text-base">
                  {product.title}
                </h3>
              </Link>

              <p className="mt-1 min-h-8 text-xs text-gray-400">
                {product.info}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-700 pt-3">
                <span className="text-base font-bold text-gray-200">
                  ₹{product.finalPrice.toLocaleString("en-IN")}
                </span>

                <span className="text-xs text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={() => alert(`${product.title} selected!`)}
                className="mt-3 w-full rounded-sm bg-red-600 px-2 py-2 text-xs text-white transition hover:bg-red-700 sm:text-sm"
              >
                Add to cart
              </button>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default RelatedProducts;
