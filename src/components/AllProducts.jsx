import { useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../data/productsData";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function AllProducts() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  window.scrollTo({ top: 0 });
  const dispatch = useDispatch();

  // Brand filter
  const handleBrandChange = (brand) => {
    setSelectedBrands((previousBrands) =>
      previousBrands.includes(brand)
        ? previousBrands.filter((item) => item !== brand)
        : [...previousBrands, brand]
    );
  };

  // Category filter
  const handleCategoryChange = (category) => {
    setSelectedCategories((previousCategories) =>
      previousCategories.includes(category)
        ? previousCategories.filter((item) => item !== category)
        : [...previousCategories, category]
    );
  };

  // Filter products
  let filteredProducts = productsData.filter((product) => {
    const brandMatch =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brand);

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return brandMatch && categoryMatch;
  });

  // Sort products
  if (sortBy === "lowToHigh") {
    filteredProducts.sort(
      (a, b) => a.finalPrice - b.finalPrice
    );
  } else if (sortBy === "highToLow") {
    filteredProducts.sort(
      (a, b) => b.finalPrice - a.finalPrice
    );
  } else if (sortBy === "latest") {
    filteredProducts.sort((a, b) => b.id - a.id);
  }

  const brands = ["JBL", "boAt", "Sony"];

  const categories = [
    "Headphones",
    "Earbuds",
    "Earphones",
    "Neckbands",
  ];

  return (
    <section className="min-h-screen bg-[#141414] px-2 py-8 text-gray-300 sm:px-2 lg:px-4">

      {/* Page Heading */}
      <h1 className="mb-6 text-xl font-semibold">
        All Products{" "}
        <span className="text-sm font-normal text-gray-500">
          ({filteredProducts.length})
        </span>
      </h1>

      {/* Main Layout */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[200px_minmax(0,1fr)]">

        {/* Sidebar */}
        <aside className="h-fit bg-[#191a1e] p-4">

          {/* Sorting */}
          <div className="mb-7">
            <h2 className="mb-3 text-sm font-semibold">
              Sort By
            </h2>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full border border-gray-700 bg-[#191a1e] px-2 py-2 text-sm outline-none focus:border-gray-500"
            >
              <option value="latest">Latest</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Brand Filters */}
          <div className="mb-7">
            <h2 className="mb-3 text-sm font-semibold">
              Brands
            </h2>

            {brands.map((brand) => (
              <label
                key={brand}
                className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-gray-400 hover:text-white"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="accent-red-600"
                />

                {brand}
              </label>
            ))}
          </div>

          {/* Category Filters */}
          <div>
            <h2 className="mb-3 text-sm font-semibold">
              Category
            </h2>

            {categories.map((category) => (
              <label
                key={category}
                className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-gray-400 hover:text-white"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="accent-red-600"
                />

                {category}
              </label>
            ))}
          </div>

        </aside>

        {/* Product Grid */}
        <section className="grid grid-cols-3 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">

          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="flex flex-col overflow-hidden bg-[#1b1c20] p-3 transition hover:bg-[#202125]"
            >

              {/* Product Image */}
              <Link to={`/product-details/${product.id}`}>
                <div className="flex h-40 items-center justify-center bg-[#202125] p-3 sm:h-44">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-contain transition duration-300 hover:scale-105"
                  />
                </div>
              </Link>

              {/* Product Information */}
              <div className="flex flex-1 flex-col">

                {/* Rating */}
                <div className="mb-1 mt-3 text-sm tracking-wide text-red-600">
                  {"★".repeat(product.rateCount)}
                  <span className="text-gray-600">
                    {"★".repeat(5 - product.rateCount)}
                  </span>
                </div>

                {/* Title */}
                <Link to={`/product-details/${product.id}`}>
                  <h2 className="truncate text-base font-semibold text-gray-200 hover:text-white">
                    {product.title}
                  </h2>
                </Link>

                {/* Description */}
                <p className="mt-1 min-h-8 text-xs text-gray-500">
                  {product.info}
                </p>

                {/* Prices */}
                <div className="mb-3 mt-3 flex flex-wrap items-center gap-2 border-t border-gray-800 pt-3">
                  <span className="text-lg font-bold text-gray-200">
                    ₹{product.finalPrice.toLocaleString("en-IN")}
                  </span>

                  <span className="text-xs text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="mt-auto w-full bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
                >
                  Add to cart
                </button>

              </div>
            </article>
          ))}

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <h2 className="text-xl font-semibold text-gray-300">
                No Products Found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your brand or category filters.
              </p>
            </div>
          )}

        </section>
      </div>
    </section>
  );
}

export default AllProducts;