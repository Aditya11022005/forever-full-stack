import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const womenSubCategories = [
    "Co-ord set",
    "Maxi & midi dress",
    "Gown",
    "Indo-Western",
    "Drape saree",
    "Party wear"
  ];
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    rentPrice: '',
    discount: '',
    category: 'Women',
    subCategory: womenSubCategories[0],
    bestseller: false,
    sizes: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(backendUrl + '/api/product/single', { productId: id });
        if (res.data.success) {
          setProduct(res.data.product);
          setForm({
            name: res.data.product.name || '',
            description: res.data.product.description || '',
            price: res.data.product.price || '',
            rentPrice: res.data.product.rentPrice || '',
            discount: res.data.product.discount || '',
            category: res.data.product.category || '',
            subCategory: res.data.product.subCategory || '',
            bestseller: res.data.product.bestseller || false,
            sizes: res.data.product.sizes || [],
          });
          // Set images if available
          setImage1(res.data.product.image && res.data.product.image[0] ? res.data.product.image[0] : false);
          setImage2(res.data.product.image && res.data.product.image[1] ? res.data.product.image[1] : false);
          setImage3(res.data.product.image && res.data.product.image[2] ? res.data.product.image[2] : false);
          setImage4(res.data.product.image && res.data.product.image[3] ? res.data.product.image[3] : false);
        } else {
          toast.error('Product not found');
        }
      } catch (err) {
        toast.error('Error fetching product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSizeToggle = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', id);
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'sizes') {
          formData.append('sizes', JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      // Only append images if changed (File type)
      if (image1 && typeof image1 !== 'string') formData.append('image1', image1);
      if (image2 && typeof image2 !== 'string') formData.append('image2', image2);
      if (image3 && typeof image3 !== 'string') formData.append('image3', image3);
      if (image4 && typeof image4 !== 'string') formData.append('image4', image4);

      const response = await axios.post(
        backendUrl + '/api/product/edit',
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Product updated successfully');
        navigate('/list');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error updating product');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Product Images</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 h-20 object-cover border' src={image1 && typeof image1 === 'string' ? image1 : image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" />
            <input onChange={e=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20 h-20 object-cover border' src={image2 && typeof image2 === 'string' ? image2 : image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" />
            <input onChange={e=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20 h-20 object-cover border' src={image3 && typeof image3 === 'string' ? image3 : image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" />
            <input onChange={e=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20 h-20 object-cover border' src={image4 && typeof image4 === 'string' ? image4 : image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="" />
            <input onChange={e=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input name='name' onChange={onChange} value={form.name} className='w-full max-w-[500px] px-3 py-2' type='text' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea name='description' onChange={onChange} value={form.description} className='w-full max-w-[500px] px-3 py-2' required />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select name='category' value='Women' className='w-full px-3 py-2' disabled>
            <option value='Women'>Women</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub category</p>
          <select name='subCategory' onChange={onChange} value={form.subCategory} className='w-full px-3 py-2'>
            {womenSubCategories.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input name='price' onChange={onChange} value={form.price} className='w-full px-3 py-2 sm:w-[120px]' type='number' />
        </div>
        <div>
          <p className='mb-2'>Rent Price</p>
          <input name='rentPrice' onChange={onChange} value={form.rentPrice} className='w-full px-3 py-2 sm:w-[120px]' type='number' />
        </div>
        <div>
          <p className='mb-2'>Discount (%)</p>
          <input name='discount' onChange={onChange} value={form.discount} className='w-full px-3 py-2 sm:w-[120px]' type='number' />
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} onClick={() => onSizeToggle(size)}>
              <p className={`${form.sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input name='bestseller' onChange={onChange} checked={form.bestseller} type='checkbox' id='bestseller' />
        <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>UPDATE</button>
    </form>
  );
};

export default Edit;
