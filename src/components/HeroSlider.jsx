import { useEffect, useState } from "react";
import productsData from "../data/productsData";
import { Link } from "react-router-dom";

function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = productsData.filter(
    (product) => product.tag === "hero-product"
  );

  useEffect(() => {
    if (products.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((previousIndex) =>
        (previousIndex + 1) % products.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [products.length]);

  if (products.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      <div className="h-[520px] overflow-hidden sm:h-[480px]">
        <div className="flex h-full w-full transition-transform duration-700 ease-in-out" style={{transform: `translateX(-${currentIndex * 100}%)`}}>
          {products.map((product) => (
            <div key={product.id} className="relative h-full w-full shrink-0">
              <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[7rem] font-bold text-white/5 sm:text-[12rem]">
                {product.type}
              </span>
              <div className="relative mx-auto flex h-full max-w-[1400px] flex-col-reverse items-center justify-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6">
                <div className="w-full max-w-md self-start pb-6 sm:self-center sm:pb-0">
                  <p className="text-lg text-gray-300">
                    {product.title}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-200 sm:text-4xl">
                    {product.tagline}
                  </h2>
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-xl font-bold text-gray-200">
                      ₹{product.finalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="font-semibold text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link to={`/product-details/${product.id}`} className="mt-8 inline-block rounded-2xl bg-[#d00000] px-8 py-3 text-sm text-white transition-colors duration-200 hover:bg-[#a80000]">
                    Shop Now
                  </Link>

                </div>
                <img src={product.heroImage} alt={product.title} className="h-56 object-contain sm:h-[360px]"/>
              </div>
            </div>
          ))}

        </div>
      </div>

      <div className="flex justify-center gap-3 py-6">

        {products.map((product, index) => (
          <button
            key={product.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentIndex === index ? "true" : undefined}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-8 bg-[#d00000]"
                : "w-2 bg-gray-500"
            }`}
          />
        ))}

      </div>

    </section>
  );
}

export default HeroSlider;