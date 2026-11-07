import React from 'react'
import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import Button from './Button';
import { useState } from 'react'; 
import productsData from '../data/productsData';
import SignupModal from './SignupModal';
import { useSelector } from "react-redux";
function Header() {
  const cartItems = useSelector((state) => state.cart.items);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0  
  );

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    return JSON.parse(localStorage.getItem("loggedInUser")) || null;
  });
    
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const filteredProducts = productsData.filter((product) => { 
    const search = searchTerm.trim().toLowerCase(); 
    return ( 
      product.title.toLowerCase().includes(search) || product.brand.toLowerCase().includes(search) || product.category.toLowerCase().includes(search) || product.info.toLowerCase().includes(search)
    );
  });


  return (
    <>
    <header className='sticky top-0 z-50 relative w-full bg-[#111111]' >
      <section className='flex items-center justify-between h-16 md:px-1'>
        <div>
          <Link to="/" className="text-3xl font-bold text-gray-200">Tech-Shop</Link>
        </div>
        <div className='flex items-center gap-15 text-[#b8bfd2] '>
          <Button type="button" onClick={() => setIsSearchOpen((previous) => !previous)} className="transition hover:text-white" buttonName= {<Search size={26} strokeWidth={2}/>}/>
          <div className="relative inline-flex">
            <Button
              type="button"
              onClick={() => navigate("/cart")}
              className="transition hover:text-white"
              buttonName={<ShoppingCart size={26} strokeWidth={2} />}
            />

            {cartQuantity > 0 && (
              <span className="pointer-events-none absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                {cartQuantity}
              </span>
            )}
          </div>
          <Button type="button" className="transition hover:text-white" onClick={() => setIsProfileOpen((previous) => !previous)} buttonName={<User size={26} strokeWidth={2} />} /> 

        
          
        </div>
      </section>
  
      {isSearchOpen && (
        <div className="absolute left-0 top-full z-50 w-full bg-[#141414] px-4 pb-4 pt-3 sm:px-6">
          <div className="mx-auto max-w-3xl">

            <div className="flex items-center border border-gray-500 px-3">
              <input type="text" placeholder="Search for product..." value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} autoFocus
                className="w-full bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-gray-500"/>

              {searchTerm && (
                <button type="button" onClick={() => setSearchTerm("")} className="px-2 text-gray-400 hover:text-white" aria-label="Clear search" >
                  <FaTimes />
                </button>
              )}
            </div>

            {searchTerm.trim() !== "" && (
              <div className="mt-2 max-h-72 overflow-y-auto border border-gray-700 bg-[#141414]">

                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 6).map((product) => (
                    <button key={product.id} type="button"
                      onClick={() => {
                        navigate(`/product-details/${product.id}`);
                        setIsSearchOpen(false);
                        setSearchTerm("");
                      }}
                      className="block w-full px-4 py-3 text-left text-sm text-gray-400 transition hover:bg-[#202125] hover:text-red-500">
                      {product.title}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-4 text-sm text-gray-500">
                    No products found.
                  </p>
                )}

              </div>
            )}
          </div>
        </div>
      )}

      {isProfileOpen && (
        <div className="absolute right-4 top-full z-50 w-72 border border-gray-700 bg-[#141414] p-5 text-gray-300 shadow-lg">

          <h3 className="text-lg font-semibold">
            Hello {loggedInUser ? loggedInUser.username : "!"}
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Access account and manage orders
          </p>

          {loggedInUser ? (
            <>
              <hr className="my-4 border-gray-700" />

              <p className="mb-4 text-sm text-gray-400">
                {loggedInUser.email}
              </p>

              <button
                onClick={() => {
                  localStorage.removeItem("loggedInUser");
                  setLoggedInUser(null);
                  setIsProfileOpen(false);
                }}
                className="w-full border border-gray-600 px-4 py-2 text-sm transition hover:border-red-600 hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsSignupOpen(true);
                  setIsProfileOpen(false);
                }}
                className="mt-4 border border-gray-600 px-4 py-2 text-sm transition hover:border-red-600 hover:text-red-500"
              >
                Login / Signup
              </button>

              <hr className="my-4 border-gray-700" />

              <p className="text-sm text-gray-400">
                Please Login
              </p>
            </>
          )}

        </div>
      )}


      {isSignupOpen && (
        <SignupModal
          onClose={() => {
            setIsSignupOpen(false);

            const user = JSON.parse(
              localStorage.getItem("loggedInUser")
            );

            setLoggedInUser(user);
          }}
        />
      )}

    </header>
    </>
  )
}

export default Header