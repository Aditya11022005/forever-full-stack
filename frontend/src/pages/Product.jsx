import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [zoom, setZoom] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomOffset, setZoomOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);

  // Close zoom on Esc
  useEffect(() => {
    if (!zoom) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setZoom(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoom]);
  const [size,setSize] = useState('')
  const [showSizeChart, setShowSizeChart] = useState(false);

  // Close size chart on Esc
  useEffect(() => {
    if (!showSizeChart) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowSizeChart(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSizeChart]);

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                ))
              }
          </div>
          <div className='w-full sm:w-[80%] relative'>
            <img
              className='w-full h-auto cursor-zoom-in transition-transform duration-300'
              src={image}
              alt=""
              onClick={() => {
                setZoom(true);
                setZoomLevel(1);
                setZoomOffset({ x: 0, y: 0 });
              }}
            />
            {zoom && (
              <div
                className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-80"
                onClick={() => setZoom(false)}
                style={{ cursor: 'zoom-out' }}
              >
                <div className="relative flex items-center justify-center w-full h-full" onClick={e => e.stopPropagation()}>
                  <img
                    src={image}
                    alt="Zoomed"
                    style={{
                      maxHeight: '80vh',
                      maxWidth: '90vw',
                      transform: `scale(${zoomLevel}) translate(${zoomOffset.x}px, ${zoomOffset.y}px)` ,
                      cursor: dragStart ? 'grabbing' : (zoomLevel > 1 ? 'grab' : 'zoom-in'),
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      borderRadius: '12px',
                      transition: 'transform 0.2s',
                    }}
                    onMouseDown={e => {
                      if (zoomLevel === 1) return;
                      setDragStart({ x: e.clientX - zoomOffset.x, y: e.clientY - zoomOffset.y });
                    }}
                    onMouseMove={e => {
                      if (dragStart && zoomLevel > 1) {
                        setZoomOffset({
                          x: e.clientX - dragStart.x,
                          y: e.clientY - dragStart.y,
                        });
                      }
                    }}
                    onMouseUp={() => setDragStart(null)}
                    onMouseLeave={() => setDragStart(null)}
                    onWheel={e => {
                      e.preventDefault();
                      let newZoom = zoomLevel + (e.deltaY < 0 ? 0.15 : -0.15);
                      if (newZoom < 1) newZoom = 1;
                      if (newZoom > 3) newZoom = 3;
                      setZoomLevel(newZoom);
                      if (newZoom === 1) setZoomOffset({x:0,y:0});
                    }}
                    draggable={false}
                  />
                  {/* Zoom Controls */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-40 rounded-full px-4 py-2 text-white text-sm items-center shadow-lg">
                    <button onClick={e => {e.stopPropagation(); setZoomLevel(z => {const nz=Math.max(1, z-0.2);if(nz===1)setZoomOffset({x:0,y:0});return nz;});}} className="px-2 text-lg font-bold">-</button>
                    <span>{Math.round(zoomLevel*100)}%</span>
                    <button onClick={e => {e.stopPropagation(); setZoomLevel(z => Math.min(3, z+0.2));}} className="px-2 text-lg font-bold">+</button>
                  </div>
                  <button
                    className="absolute top-6 right-8 text-white text-3xl font-bold z-50 bg-black bg-opacity-40 rounded-full px-3 py-1 hover:bg-opacity-70 transition"
                    onClick={() => setZoom(false)}
                    style={{lineHeight:1}}
                    aria-label="Close zoom"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className=' flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
          </div>
          <div className='mt-5 flex items-center gap-4'>
            <p className='text-3xl font-medium'>{currency}{productData.price}</p>
            {productData.discount && (
              <span className='bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold'>
                {productData.discount}% OFF
              </span>
            )}
          </div>
          {/* For Rent card removed as requested */}
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <div className='flex items-center gap-4'>
              <p>Select Size</p>
              <button
                className='text-blue-600 underline text-xs font-semibold hover:text-blue-800 transition'
                type='button'
                onClick={() => setShowSizeChart(true)}
              >
                Size Chart
              </button>
            </div>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
            {/* Size Chart Modal */}
            {showSizeChart && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                onClick={() => setShowSizeChart(false)}
              >
                <div
                  className="bg-white rounded-lg shadow-lg p-6 relative max-w-md w-full"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black font-bold"
                    onClick={() => setShowSizeChart(false)}
                    aria-label="Close size chart"
                  >
                    &times;
                  </button>
                  <h2 className="text-lg font-semibold mb-4 text-center">Size Chart</h2>
                  {/* You can replace this table with an image if you have a size chart image */}
                  <table className="w-full text-sm border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-2 py-1">Size</th>
                        <th className="border px-2 py-1">Chest (in)</th>
                        <th className="border px-2 py-1">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1">S</td>
                        <td className="border px-2 py-1">36</td>
                        <td className="border px-2 py-1">26</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">M</td>
                        <td className="border px-2 py-1">38</td>
                        <td className="border px-2 py-1">27</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">L</td>
                        <td className="border px-2 py-1">40</td>
                        <td className="border px-2 py-1">28</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">XL</td>
                        <td className="border px-2 py-1">42</td>
                        <td className="border px-2 py-1">29</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">XXL</td>
                        <td className="border px-2 py-1">44</td>
                        <td className="border px-2 py-1">30</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-400 mt-2 text-center">*All measurements are in inches and may vary slightly.</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm rounded-full font-bold active:bg-gray-700 flex-1'>ADD TO CART</button>
            <a
              href={`https://wa.me/919322465522?text=I%20want%20to%20rent%20${encodeURIComponent(productData.name)}%20(product%20id:%20${productData._id})`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm rounded-full font-bold shadow transition-all duration-200 flex-1 ${!productData.rentPrice ? 'opacity-50 pointer-events-none' : ''}`}
              aria-disabled={!productData.rentPrice}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 text-green-400">
                <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.08 2.48 7.16l-1.6 5.84a1 1 0 001.24 1.24l5.84-1.6A11.96 11.96 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.91-.52-5.6-1.5a1 1 0 00-.8-.08l-4.36 1.2 1.2-4.36a1 1 0 00-.08-.8A9.96 9.96 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm4.32-7.08c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.28-.22.22-.86.84-.86 2.06 0 1.22.88 2.4 1 2.56.12.16 1.73 2.64 4.2 3.6.59.2 1.05.32 1.41.41.59.15 1.13.13 1.56.08.48-.06 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
              </svg>
              Rent Now
            </a>
          </div>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
