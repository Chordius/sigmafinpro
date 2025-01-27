import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { IconContext } from "react-icons";


const Admin = () => {

        const [createdProducts, setCreatedProducts] = useState([]);
        const [successMessage, setSuccessMessage] = useState('');
        const [failMessage, setFailMessage] = useState('');

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

        const [formData, setFormData] = useState({
            name: '',
            description: '',
            img: '',
            price: '',
        });


        const handleDelete = async (itemId) => {
            try {
                // Make DELETE request
                await axios.delete(`http://localhost:3000/item/delete/${itemId}`)
                setFailMessage('')
                setSuccessMessage('Successfully deleted an item!');
                makeProductList()
            } catch(err) {
                setFailMessage("An unexpected error occured.")
            }
        }
        
        {/* Handle Randomize Button */}
        const handleRandom = async () => {
            try {
              // Make the POST request
              const itemrandom = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
              const randomMeal = itemrandom.data.meals[0];

              const cutDescription = randomMeal.strInstructions.length > 200 ? 
              randomMeal.strInstructions.substring(0, 200) : randomMeal.strInstructions;

              setFormData({
                name: `${randomMeal.strMeal}`,
                description: `${cutDescription}`,
                img: `${randomMeal.strMealThumb}`,
                price: '',
            });
            } catch (err) {
              console.error("Error during login:", err);
            }
        };

        {/* Handle Form Changes*/}
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
            ...formData,
            [name]: value,
            });
        };
    

        {/* Handle Form Submission */}
        const handleSubmit = async (e) => {
            e.preventDefault(); // Prevent the browser's default behavior
    
        try {
          console.log('Submitted data:', formData); // Log form data
          
          // Make the POST request
          const response = await axios.post("http://localhost:3000/item/create", formData);
          setFailMessage('')
          setSuccessMessage(`Successfully added: ${formData.name}`);
          if (response) {
            setFormData({
                name: '',
                description: '',
                img: '',
                price: '',
            });
            makeProductList()
            setTimeout(() => setSuccessMessage(''), 3000);
            console.log("Success!")
          } else {
            setFailMessage("Fetch failed, no data received");
          }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setFailMessage("Error during submission: " + err.response.data.message);
            } else {
                setFailMessage("An unexpected error occured.")
            }
        }
      };

  return (
    <div name='Admin' className='w-full flex flex-col pt-24'>
        
        <div className='pt-12 pb-12 px-12'>
            <p className='text-xl text-center text-slate-700'>Welcome {JSON.parse(localStorage.getItem('user')).data.name} to:</p>
            <div className='text-5xl py-2 text-center'>
                <p className='inline-block border-b-4 border-slate-600 m-auto'>Tahu Bulat™ Menu Creator</p>
            </div>
        </div>

        <div className='md:grid md:grid-cols-6 py-3 md:px-12'>
            <div className='h-screen col-span-4 pl-12 pr-12 md:pr-36'>
                <form onSubmit={handleSubmit}>
                    <p className='text-xl py-3'>Menu Name</p>
                    <div className="mb-4">
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <p className='text-xl py-3'>Menu Description</p>
                    <div className="mb-4">
                        <textarea
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full h-32 px-3 py-2 border rounded-md"
                        maxLength="200"
                        />
                    </div>
                    <p className='text-xl py-3'>Menu Price (Rp.)</p>
                    <div className="mb-6">
                        <input
                        type="number"
                        min="1"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <p className='text-xl py-3'>Menu Image Link</p>
                    <div className="mb-6">
                        <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className='py-3'>
                        <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                        Create!
                        </button>
                    </div>
                </form>
                <button onClick={handleRandom} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                    Randomize!
                </button>
                {/* Display success message */}
                {successMessage && (
                    <div className="mt-4 p-3 text-green-600 bg-green-100 border border-green-400 rounded">
                    {successMessage}
                    </div>
                )}
                {failMessage && (
                    <div className="mt-4 p-3 text-red-600 bg-red-100 border border-red-400 rounded">
                    {failMessage}
                    </div>
                )}
                
            </div>

            <div className='bg-slate-200 h-auto min-h-max border-2 rounded-lg py-8 px-6 text-slate-500 text-2xl text-center col-span-2'>
                Database of Menu Items so far :
                {createdProducts.map((item, index) => (
                    <div key={index} className="pt-6 px-4 grid grid-cols-7 items-center">
                        <div className='flex gap-x-6 text-left col-span-3'>
                            <h1 className="text-2xl font-bold">{createdProducts.indexOf(item) + 1}.</h1>
                            <h1 className="text-2xl font-bold">{item.name}</h1>
                        </div>
                        <p className="text-right text-lg text-green-600 pl-10 col-span-3 translate-x-8">Rp. {item.price}</p>
                        <button onClick={() => handleDelete(item._id)} className='ml-12 text-right hover:bg-red-300 px-2 py-2 w-10 rounded-lg border-0 hover:scale-125'>
                                <FaTrash />
                        </button>
                    </div>
                    
                ))}
            </div>
        </div>

    </div>
  )
}

export default Admin
