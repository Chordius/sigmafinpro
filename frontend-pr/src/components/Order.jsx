import React from 'react'
import Footer from './Footer'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
import axios from 'axios'


const Order = () => {

    const [createdProducts, setCreatedProducts] = useState([]);
    const [cartItems, setCartItems] = useState([])

    {/* Fetch products from the database*/}
    const makeProductList = async () => {
        try {
        const itemres = await axios.get("http://localhost:3000/item/all/");
        setCreatedProducts(itemres.data); // Update state with fetched items
        } catch (err) {
        console.error("Failed to fetch items:", err);
        }
    };

    useEffect(() => {
        makeProductList();
      }, []);

    {/* Item in Cart Check */}
    const isItemInCart = (productId) => {
        return cartItems.some(item => item._id === productId);
    };

    {/* Configure Shopping Cart */}
    const addToCart = (product) => {
        setCartItems( (prevCart) => {
            if (isItemInCart(product._id)) {
                const itemIndex = prevCart.findIndex(p => p._id === product._id)
                const updatedCart = [...prevCart];
                updatedCart[itemIndex] = {
                    ...updatedCart[itemIndex], // Copy the current item
                    quantity: updatedCart[itemIndex].quantity + 1, // Update the quantity
                };              
                return updatedCart
            } else {
                return [...prevCart, { ...product, quantity: 1 }]
            }
        })
    }

    const removeFromCart = (product) => {
        setCartItems((prevCart) => {
            const updatedCart = [...prevCart]
            const itemIndex = prevCart.findIndex(p => p._id === product._id)
            if (updatedCart[itemIndex].quantity === 1) {
                return updatedCart.filter((cartItem) => cartItem._id !== product._id);
            } else {
                updatedCart[itemIndex] = {
                    ...updatedCart[itemIndex], // Copy the current item
                    quantity: updatedCart[itemIndex].quantity - 1, // Update the quantity
                };
            }
            return updatedCart
        });
    };
    
      // Calculate total price
      const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
      };

  return (
    <div name='Order' className='justify-center w-full bg-white flex flex-col pt-24'>

        {/* Divide the page into 2 parts*/}
        <div className='md:grid-cols-5 md:grid'>

            {/* Order Section */}
            <div className='col-span-4'>
                <div className=' container ml-16 mt-16'>
                    <h1 className='text-4xl font-bold inline-block border-b-4 border-slate-800'>Order</h1>
                    <p className='text-xl text-slate-600 py-4 italic'>"Choose your favorite homemade flavorful snack~"</p>
                </div>
            
                {/* Products */}
                <div className='container px-auto'>
                    <div className='flex flex-wrap space-x-4 justify-center items-center py-24 gap-y-24'>
                        {/* Card */}
                        {createdProducts.map((item, index) => (
                            <div key={item._id} className="rounded-2xl bg-slate-200 hover:bg-slate-400 hover:text-white shadow-xl duration-high group w-[275px] min-h-[425px] justify-center">

                                <div className="h-[100px]">
                                    <img src={item.img} alt={item.name} className="h-[150px] mx-auto border-0 rounded-2xl object-cover transform -translate-y-14 group-hover:scale-105 duration-300 shadow-md"/>
                                </div>

                                {/* Card Content */}
                                <div className='justify-center align-top hover:text-white grid grid-rows-6'>
                                    <div className='row-span-5 text-center'>
                                        <p className='text-lg font-bold pt-2'>{item.name}</p>
                                        <p className='text-xl font-semibold text-green-600'>Rp. {item.price}</p>
                                        <p className="md:text-md pt-2 px-4">{item.description}</p>
                                    </div>
                                    { isItemInCart(item._id) ? 
                                    <div className='flex gap-x-12 justify-center items-center mt-[21px]'>
                                        <button onClick={() => removeFromCart(item)} className='px-2 py-1 mt-[1px] hover:bg-red-500 rounded hover:scale-125'>
                                            <FaMinus />
                                        </button>
                                        <p className='font-bold text-lg'>{cartItems[cartItems.findIndex(p => p._id === item._id)].quantity}</p>
                                        <button onClick={() => addToCart(item)} className='px-2 py-1 mb-[1px] hover:bg-blue-500 rounded hover:scale-125'>
                                            <FaPlus />
                                        </button>
                                    </div>
                                    :
                                    <div className='flex justify-center items-center'>
                                        <button onClick={() => addToCart(item)} className = 'border-black border-2 w-[150px] px-2 py-2 mb-2 rounded-lg hover:bg-slate-700 duration-100 text-center'>
                                            Add to Cart
                                            <HiArrowNarrowRight className = 'inline-block ml-3' />
                                        </button>
                                    </div>
                                    }
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

            </div>
            
            {/* Shopping Cart Section */}
            <div className='col-span-1 bg-gray-100 p-6 shadow-lg min-h-fit'>
                <h2 className='text-xl font-bold mb-4'>Shopping Cart</h2>
                <div className='space-y-4'>
                    {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <p className='text-sm'>{item.name}</p>
                        <p className='text-sm font-bold'>{item.quantity}x</p>
                    </div>
                    ))}
                </div>

                {/* Total */}
                <div className='mt-4 pt-4'>
                    <p className='text-lg font-bold mb-4'>Total: Rp.{calculateTotal()}</p>
                    <button className='justify-center items-center border-2 border-black text-black hover:text-white w-full py-2 rounded-md hover:bg-slate-600 flex text-md gap-x-2'>
                        <CiShoppingBasket />
                        Checkout
                        <CiShoppingBasket />
                    </button>
                </div>
            </div>

        </div>

        <div>
            {/* Footer */}
            <Footer />
        </div>

    </div>
  )
}

export default Order
