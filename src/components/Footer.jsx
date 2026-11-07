import React from 'react'
import { footMenu, footSocial } from '../data/footerData';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button'


function Footer() {
  const[email,setEmail]=useState('')
  const[msg,setMsg]=useState('')

  let mailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function subscribe(event){
    event.preventDefault();
    if (!mailPattern.test(email)){
      return setMsg('Enter vaild email')
    }
    else{
      setMsg('Thanks for subscribing!')
      setEmail('')
      console.log("adc");
    }

  }
  return (
    <>
    <footer  className="bg-black ">
      <div className=" grid gap-10  py-14 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div>
          <Link to="/" className="text-3xl font-bold text-gray-200">Tech-Shop</Link>
          <p className="mt-6 max-w-xs text-sm text-gray-400">
            Subscribe to our Email alerts to receive early discount offers, and new products info.
          </p>
          <form onSubmit={subscribe} className="mt-5 max-w-xs">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address*"
              className="w-full border border-gray-600 bg-transparent px-3 py-3 text-sm text-gray-200 placeholder-gray-500 focus:border-gray-400"
            />
            <Button type="submit" buttonName="Subscribe" className="mt-3 bg-red-600 px-6 py-2 text-sm text-white transition hover:bg-red-700" />
            {msg && <p className="mt-2 text-xs text-gray-400">{msg}</p>}
          </form>
        </div>
        {footMenu.map((section)=>(
          <div key={section.id}>
            <h4 className="font-semibold text-gray-200">{section.title}</h4>
            <ul className="mt-6 space-y-4 text-sm text-gray-400">
              {section.menu.map((m)=>(
                <li key={m.id}><Link to={m.path} className="hover:text-white ">{m.link}</Link></li>

              ))}
            </ul>
          </div>
        ))}
      </div>
        <hr className='text-gray-400' />

      <section className="flex flex-col gap-5  py-5 md:flex-row md:items-center md:justify-between md:px-10 lg:px-2">
        <p className=" text-gray-400">
          {new Date().getFullYear()} | All Rights Reserved ©.
        </p>

        <div className="flex items-center gap-6 text-gray-400">

          {footSocial.map((social) => (
            <a
              key={social.id}
              href={social.path}
              aria-label={`Social media ${social.id}`}
              className="text-lg transition-colors duration-200 hover:text-white"
            >
              {social.icon}
            </a>
          ))}

        </div>

      </section>

  


    </footer>
    
    </>
  )
}

export default Footer