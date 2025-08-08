import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext);

  return (
    <Link onClick={()=>scrollTo(0,0)} className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden w-full aspect-[3/4] flex items-center justify-center rounded-lg border border-gray-200'>
        <img 
          className='object-cover w-full h-full max-h-80 transition-transform duration-300 hover:scale-105 bg-transparent' 
          src={image[0]} 
          alt="" 
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className=' text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
