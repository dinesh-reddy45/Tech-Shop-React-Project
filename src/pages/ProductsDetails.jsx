import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import productsData from '../data/productsData';
import reviewsData from '../data/reviewsData';
import Advantages from '../components/Advantages';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';


const tabs = ['Specifications', 'Overview', 'Reviews'];

function ProductDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Specifications');
  const dispatch = useDispatch()

  useEffect(() => {
    setSelectedImage(0);
    setActiveTab('Specifications');
    window.scrollTo({ top: 0 });
  }, [id]);

  const product = productsData.find((item) => item.id === Number(id));
// console.log(product);
  if (!product) {
    return (
      <div className="px-4 py-24 text-center">
        <p className="text-gray-400">Product not found.</p>
        <Link to="/" className="mt-6 inline-block bg-[#d00000] px-6 py-2 text-white">
          Browse products
        </Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.finalPrice) / product.originalPrice) * 100);

  const specs = [
    ['Brand', product.brand],
    ['Model', product.title],
    ['Generic Name', product.category],
    [`${product.category} Type`, product.type],
    ['Connectivity', product.connectivity],
    ['Microphone', 'Yes'],
  ];

  const relatedProducts = productsData.filter((item) => item.category === product.category).slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-[1400px] gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {product.images.map((src, index) => (
              <button key={src} type="button" onClick={() => setSelectedImage(index)}
                className={`flex h-20 w-20 items-center justify-center border-2 bg-[#1d1f23] p-1 ${
                  selectedImage === index ? 'border-white' : 'border-gray-600'
                }`}>
                <img src={src} alt="" className="max-h-full object-contain" />
              </button>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center">
            <img src={product.images[selectedImage]} alt={product.title} className="max-h-[480px] w-full object-contain"/>
          </div>
        </div>

        <div className="pt-2">
          <h1 className="text-3xl font-bold text-gray-200">{product.title}</h1>
          <p className="mt-3 font-medium text-gray-300">{product.info}</p>

          <div className="mt-3 flex items-center gap-3 text-gray-400">
            <span className="text-red-600">{'★'.repeat(product.rateCount)}</span>
            <span className="text-gray-600">|</span>
            <span>{product.ratings} Ratings</span>
          </div>

          <hr className="my-6 border-white/10" />

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-gray-200">
                  ₹{product.finalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-lg font-semibold text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="mt-3 text-green-600">
                You save: ₹{(product.originalPrice - product.finalPrice).toLocaleString('en-IN')} ({discount}%)
              </p>
              <p className="mt-2 text-sm text-gray-500">(Inclusive of all taxes)</p>
            </div>

            <span className="bg-green-700 px-3 py-1 text-sm font-semibold text-white">✓ In Stock</span>
          </div>

          <hr className="my-6 border-white/10" />

          <h4 className="font-semibold text-gray-200">Offers and Discounts</h4>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-300">
            <div className="border border-gray-600 p-3">No Cost EMI on Credit Card</div>
            <div className="border border-gray-600 p-3">Pay Later & Avail Cashback</div>
          </div>

          <hr className="my-6 border-white/10" />

          <button
            type="button"
            className="bg-[#d00000] px-8 py-3 text-sm text-white transition-colors duration-200 hover:bg-[#a80000]"
            onClick={()=>dispatch(addToCart(product))}
          >
            Add to cart
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
        <div className="flex justify-center gap-4 sm:gap-10">
          {tabs.map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm transition-colors duration-200 ${activeTab === tab ? 'bg-[#d00000] text-white' : 'text-gray-300 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 min-h-[260px]">
          {activeTab === 'Specifications' && (
            <dl className="max-w-md">
              {specs.map(([label, value]) => (
                <div key={label} className="flex justify-between py-3 text-sm">
                  <dt className="text-gray-400">{label}</dt>
                  <dd className="font-semibold text-gray-200">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {activeTab === 'Overview' && (
            <p className="max-w-2xl leading-7 text-gray-400">
              The {product.title} are {product.info.toLowerCase()} from {product.brand}.{' '}
              {product.tagline ? `${product.tagline} ` : ''}
              Enjoy {product.connectivity.toLowerCase()} connectivity and a built-in microphone for calls.
            </p>
          )}

          {activeTab === 'Reviews' && (
            <ul className="max-w-2xl divide-y divide-white/10">
              {reviewsData.map((review) => (
                <li key={review.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-200">{review.name}</span>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <div className="my-2 text-sm text-red-600">{'★'.repeat(review.rateCount)}</div>
                  <p className="text-sm text-gray-400">{review.review}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6">
        <h2 className="py-14 text-center text-2xl font-semibold text-gray-300">Related Products</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <div key={item.id} className="overflow-hidden border border-[#252525] bg-[#1b1b1b]">
              <Link to={`${item.path}${item.id}`} className="flex h-40 items-center justify-center bg-[#202124] p-4">
                <img src={item.images[0]} alt={item.title} className="h-full object-contain" />
              </Link>

              <div className="p-4">
                <div className="mb-2 text-sm text-red-600">{'★'.repeat(item.rateCount)}</div>
                <Link to={`${item.path}${item.id}`} className="text-lg font-semibold text-gray-200 hover:text-white">
                  {item.title}
                </Link>
                <p className="mt-1 text-xs text-gray-500">{item.info}</p>
                <hr className="my-3 border-[#292929]" />
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-200">
                    ₹{item.finalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    ₹{item.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <button type="button" className="mt-3 w-full bg-red-600 py-1 text-base text-white transition-colors hover:bg-red-700"
                onClick={() => dispatch(addToCart(item))}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    <Advantages/>

    </>
    
  );
}

export default ProductDetails;