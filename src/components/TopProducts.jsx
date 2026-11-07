import React, { useState } from 'react'
import productsData from '../data/productsData'
import { FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function TopProducts() {
    const[selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All","Headphones","Earbuds","Earphones","Neckbands"];
    const navigate = useNavigate();
    const filteredProducts =selectedCategory === "All" ? productsData: productsData.filter(
        (product) => product.category === selectedCategory
      );
    const products= filteredProducts.slice(0,11)
    // console.log(products);

    const dispatch=useDispatch();

  return (
    <>
    <section className="bg-[#111111] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mb-8 text-center text-2xl font-semibold">
            Top Products
        </div>
        <div className="mb-8 flex flex-wrap justify-center gap-6">
            {categories.map((category) => (
            <button key={category} type="button" onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm transition-colors duration-500 ${selectedCategory === category? "bg-red-600 text-white": "text-gray-400 hover:text-white"}`} >
            {category}</button>
            ))}
        </div>


        <div className="grid  grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <div key={product.id} className="overflow-hidden border border-[#252525] bg-[#1b1b1b]  hover:border-gray-600">
                    <Link to={`/product-details/${product.id}`} >
                    <div className="flex h-40 items-center justify-center bg-[#202124] p-4 sm:h-44">
                        <img src={product.images[0]} alt={product.title} 
                        className="h-full w-full object-contain "/>
                        
                    </div>
                    </Link>

                    <div className="p-4">
                        <div className="mb-2 text-sm text-red-600 ">
                            {"★".repeat(product.rateCount)}
                        </div>
                        <Link to={`/product-details/${product.id}`}>
                            <h3 className="text-lg font-semibold text-gray-200">
                                {product.title}
                            </h3>
                        </Link>
                        <p className="mt-1 text-xs text-gray-500">{product.info}</p>

                        <hr className="my-3 border-[#292929]"/>

                        <div className="flex items-center gap-3">
                            <span className="text-lg font-semibold text-gray-200">
                                ₹{product.finalPrice.toLocaleString("en-IN")}
                            </span>

                            <span className="text-xs text-gray-500 line-through">
                                ₹{product.originalPrice.toLocaleString("en-IN")}
                            </span>
                        </div>

                        <button type="button" className="mt-3 w-full bg-red-600 py-1 text-base text-white transition-colors hover:bg-red-700"
                        onClick={()=>dispatch(addToCart(product))}>
                            Add to cart
                        </button>
                    </div>    
                </div>
            ))}
            <Link to="/products" className="flex min-h-40 items-center justify-center gap-3 border border-[#252525] bg-[#111111] text-xl text-gray-300 transition-colors duration-200 hover:border-gray-500 hover:text-white">
                Browse All Products <FiArrowRight />
            </Link>
        </div>
        


    </section>
    </>
  )
}

export default TopProducts