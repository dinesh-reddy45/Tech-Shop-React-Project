import React from 'react'
import {FaShippingFast, FaShieldAlt, FaTags, FaCreditCard} from 'react-icons/fa';
import servicesData from '../data/servicesData';
function Advantages() {
    // console.log(servicesData);
  return (
    <>
   <section className="bg-[#111111] px-4 py-12 text-white sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold"> Our Advantages </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {servicesData.map((service) => ( 
                <div key={service.id} className="flex items-center justify-center gap-5" >
                    <span className="shrink-0 text-4xl text-red-600"> {service.icon} </span> 
                    <div> 
                        <h3 className="text-base font-semibold text-gray-200"> {service.title} </h3> 
                        <p className="mt-1 text-sm text-gray-400"> {service.info} </p> 
                    </div> 
                </div> 
            ))} 
        </div> 
    </section>
    
    </>
  )
}

export default Advantages