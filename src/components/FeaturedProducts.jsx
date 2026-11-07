import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/productsData";

const products = productsData.filter((product) => product.tag === "featured-product");
const half = Math.floor(products.length / 2);
const positionClasses = {
  "-2": "left-[2%] scale-50 opacity-60 z-10",
  "-1": "left-[26%] scale-75 opacity-80 z-20",
  "0": "left-1/2 scale-100 opacity-100 z-30",
  "1": "left-[74%] scale-75 opacity-80 z-20",
  "2": "left-[98%] scale-50 opacity-60 z-10",
};

function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(half);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  if (products.length === 0) return null;
  const getOffset = (index) => {
    let offset = index - currentIndex;
    if (offset > half) {
      offset -= products.length;
    } 
    else if (offset < -half) {
      offset += products.length;
    }
    return offset;
  };

  const handleProductClick = (product, offset, index) => {
    if (offset === 0) {
      navigate(`${product.path}${product.id}`);
    } 
    else {
      setCurrentIndex(index);
    }
  };

  return (
    <section>
      <h2 className="py-14 text-center text-2xl font-semibold text-gray-300">
        Featured Products
      </h2>

      <div className="relative mx-auto h-[330px] max-w-[1400px] overflow-hidden">
        {products.map((product, index) => {
          const offset = getOffset(index);
          return (
            <button type="button" key={product.id} onClick={() => handleProductClick(product, offset, index)}
              className={`absolute top-0 flex w-40 -translate-x-1/2 flex-col items-center text-center transition-all duration-700 sm:w-56 
                ${positionClasses[offset] ?? "pointer-events-none opacity-0"}`}>
              <p className="mb-4 text-sm text-gray-400">
                {product.title}
              </p>
              <img src={product.images[0]} alt={product.title} className="h-40 object-contain sm:h-48"/>
              <p className="mt-4 flex items-baseline gap-2 font-bold text-gray-200">
                ₹{product.finalPrice.toLocaleString("en-IN")}
                <span className="text-xs font-semibold text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 pb-6 pt-6">
        {products.map((product, index) => (
          <button key={product.id} type="button" aria-label={`Show ${product.title}`} 
          onClick={() => setCurrentIndex(index)}
          className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index? "w-8 bg-[#d00000]": "w-2 bg-gray-500"}`}/>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;