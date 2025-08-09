import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState(['Women']);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const minPrice = 0;
  const maxPrice = 10000;
  const [subCategory, setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  // Women subcategories
  const womenSubCategories = [
    "Co-ord set",
    "Maxi & midi dress",
    "Gown",
    "Indo-Western",
    "Drape saree",
    "Party wear"
  ];

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  // Removed toggleSubCategory

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
      // Only apply subcategory if Women is selected and subCategory is not empty
      if (category.includes('Women') && subCategory.length > 0) {
        productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
      }
    }
    // Price filter (min-max)
    productsCopy = productsCopy.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products, priceRange])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-10 border-t bg-white min-h-screen">
      {/* Filter Options */}
      <div className="min-w-60 max-w-xs bg-white rounded-xl shadow-md p-6 h-fit mb-8">
        <p onClick={()=>setShowFilter(!showFilter)} className="mb-6 text-2xl font-bold flex items-center cursor-pointer gap-2 text-gray-800 tracking-wide select-none">
          <span className="inline-block">Filters</span>
          <img className={`h-4 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-200 rounded-lg px-5 py-4 mt-2 transition-all duration-200 bg-gray-50 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-4 text-base font-semibold text-gray-700 tracking-wide'>Category</p>
          <div className='flex flex-col gap-3 text-base font-normal text-gray-700'>
            <label className='flex items-center gap-3 cursor-pointer'>
              <input className='w-4 h-4 accent-pink-500 rounded' type="checkbox" value={'Women'} checked={category.includes('Women')} onChange={toggleCategory}/>
              <span>Women</span>
            </label>
          </div>
        </div>
        {/* SubCategory Filter: Only for Women */}
        {category.includes('Women') && (
          <div className={`border border-gray-200 rounded-lg px-5 py-4 mt-6 transition-all duration-200 bg-gray-50 ${showFilter ? '' :'hidden'} sm:block`}>
            <p className='mb-4 text-base font-semibold text-gray-700 tracking-wide'>Type</p>
            <div className='flex flex-col gap-2 text-base font-normal text-gray-700'>
              {womenSubCategories.map(sub => (
                <label className='flex items-center gap-3 cursor-pointer' key={sub}>
                  <input
                    className='w-4 h-4 accent-blue-500 rounded'
                    type="checkbox"
                    value={sub}
                    checked={subCategory.includes(sub)}
                    onChange={e => {
                      if (subCategory.includes(e.target.value)) {
                        setSubCategory(prev => prev.filter(item => item !== e.target.value));
                      } else {
                        setSubCategory(prev => [...prev, e.target.value]);
                      }
                    }}
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {/* Price Range Filter (slider) */}
        <div className={`border border-gray-200 rounded-lg px-5 py-4 mt-6 transition-all duration-200 bg-gray-50 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-4 text-base font-semibold text-gray-700 tracking-wide'>Price</p>
          <div className='flex flex-col gap-2 text-base font-normal text-gray-700'>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={minPrice}
                max={priceRange[1]}
                step={100}
                value={priceRange[0]}
                onChange={e => {
                  const val = Math.min(Number(e.target.value), priceRange[1] - 100);
                  setPriceRange([val, priceRange[1]]);
                }}
                className="w-full accent-blue-500 h-2 rounded-lg appearance-none bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="range"
                min={priceRange[0]}
                max={maxPrice}
                step={100}
                value={priceRange[1]}
                onChange={e => {
                  const val = Math.max(Number(e.target.value), priceRange[0] + 100);
                  setPriceRange([priceRange[0], val]);
                }}
                className="w-full accent-blue-500 h-2 rounded-lg appearance-none bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>₹{priceRange[0]}</span>
              <span>to</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 rounded-lg text-base px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition'>
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {
            filterProducts.map((item,index)=>(
              <div key={index} className="rounded-xl shadow hover:shadow-lg transition-shadow duration-200 p-3 flex flex-col items-center">
                <ProductItem name={item.name} id={item._id} price={item.price} image={item.image} discount={item.discount} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
