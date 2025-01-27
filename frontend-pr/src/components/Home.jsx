import React, { useState, useEffect } from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const Home = ({ onLoginClick }) => {
    {/* Function to check if user has logged in */}
    let userIsLoggedIn;

    const [createdProducts, setCreatedProducts] = useState([]);

    if (localStorage.getItem('user')) {
        userIsLoggedIn = true;
    }

    {/* Fetch products from the database*/}
    const makeProductList = async () => {
        try {
        const itemres = await axios.get("http://localhost:3000/item/all/");
        let itemshowcase = []
        for (let i = 0; i < itemres.data.length; i++) {
            if (itemres.data[i] && (itemres.data.indexOf(itemres.data[i]) < 5)) {
                itemshowcase = [...itemshowcase, itemres.data[i]]
                setCreatedProducts(itemshowcase);
            }
        }
        } catch (err) {
        console.error("Failed to fetch items:", err);
        }
    };

    useEffect(() => {
        makeProductList();
      }, []);

  return (
    <div name = 'home' className = 'w-full text-black pt-36'>

        {/* Greeting */}
        <div className = 'py-8 px-20 grid justify-center md:grid-cols-2'>
            <div className = 'w-full flex justify-center py-4 px-1 flex-col'>
                <h1 className = 'md:text-left text-center text-4xl font-bold'>
                    Selamat Datang ke Website Utama Tahu Bulat™!
                </h1>
                <p className = 'md:text-left text-center text-xl py-8'>
                    Tahu Bulat™ adalah restoran tahu bulat terbesar di Indonesia yang
                    menghadirkan kelezatan tahu bulat dalam berbagai variasi rasa. Kami berkomitmen untuk menyajikan
                    camilan gurih, nikmat, dan menggugah selera, dengan bahan-bahan berkualitas tinggi yang diolah
                    secara higienis. 
                    Dari resep klasik hingga kreasi terbaru, Tahu Bulat™ selalu hadir untuk memanjakan lidah Anda 
                    kapan saja dan di mana saja.
                </p>
                <div className='text-center md:text-left pb-4 md:pb-0'>
                    <NavLink to='/about'>
                        <button className = 'border-black border-2 text-black text-xl w-[265px] px-4 py-2 mb-2 rounded-lg hover:bg-slate-500 duration-100 text-left'>
                            Learn More About Us!
                            <HiArrowNarrowRight className = 'inline-block ml-3' />
                        </button>
                    </NavLink>
                </div>
            </div>
            <img src = 'https://palpos.bacakoran.co/upload/4a909ffe6e2bfcaf206bafdafbdfcde3.jpg' alt = 'Tahu Bulat' className = 'w-auto h-[100%] border-3 rounded-xl object-cover justify-self-center md:justify-self-end md:w-[80%] hover:scale-110 duration-100' />
        </div>

        {/* Food of the Day */}
        <div className="text-center">
            <h1 className="text-4xl font-bold my-8 mt-24 border-b-4 border-slate-600 inline-block">Food of the Day:</h1>
        </div>
        <div className="bg-slate-400 border-0 inline-flex justify-center items-stretch space-x-4 py-10 w-full">
            {/* Card */}
            {[
                {
                    title: 'Tahu Bulat Keju Lumer',
                    img: 'https://cnc-magazine.oramiland.com/parenting/images/Resep_Tahu_Bulat_Keju_Lumer.width-800.format-webp.webp',
                    description: `'Tahu bulat' adalah makanan ringan yang terbuat dari tahu yang diolah dengan cara digoreng.`
                },
                {
                    title: 'Tahu Bulat Kopong Mulus',
                    img: 'https://cnc-magazine.oramiland.com/parenting/images/Resep_Tahu_Bulat_Kopong.width-800.format-webp.webp',
                    description: 'Tahu bulat identik dengan dalamnya yang kopong. Selain kopong, mulus dan renyah juga jadi kunci kenikmatan tahu bentuk bulat ini.'
                },
                {
                    title: 'Tahu Bulat Pedas',
                    img: 'https://cnc-magazine.oramiland.com/parenting/images/Resep_Tahu_Bulat_Pedas_Asin.width-800.format-webp.webp',
                    description: `'Tahu bulat' adalah makanan ringan yang terbuat dari tahu yang diolah dengan cara digoreng.`
                },
            ].map((item, index) => (
                <div key={index} className="w-[30%] bg-slate-300 hover:scale-110 duration-100 px-4 py-2 border-0 rounded-xl flex flex-col items-center text-center" >
                    <h1 className="text-2xl font-bold py-3">{item.title}</h1>
                    <img src={item.img} alt={item.title} className="w-auto h-[33vh] object-cover border-0 rounded-lg" />
                    <p className="md:text-lg py-3">{item.description}</p>
                </div>
            ))}
        </div>

        {/* Order */}
        <div className="py-24 pt-36">
            <h1 className="text-4xl font-bold text-center">Explore Our Menu Further</h1>
            {/* New Content */}
            <div className="py-6 text-center">
                <p className='text-xl'>⭐ Fresh ingredients, crafted with care and love.  
                ⭐ A variety of flavors to satisfy every craving.  
                ⭐ Order online, enjoy anytime!</p>
            </div>
            <div className="py-4 px-64 flex flex-wrap justify-center gap-8">
                {createdProducts.map((item, index) => (
                <div className="flex flex-wrap">
                    <img src={item.img} alt={item.name} className="h-[33vh] object-cover rounded-lg shadow-md hover:scale-110 duration-100"/>
                </div>
                ))}
            </div>
            <div className="text-xl text-center py-2">
                <p className='py-4'>With every ingredients come a special mix of flavours in a light-hearted snack~</p>
                { userIsLoggedIn ? 
                    <NavLink to='/order' >
                        <button className="bg-slate-400 text-white text-3xl px-6 py-4 rounded-2xl hover:bg-slate-500 hover:scale-110 duration-100">
                            Order Now
                            <HiArrowNarrowRight className = 'inline-block ml-3' />
                        </button>
                    </NavLink>
                    :
                    <button onClick={onLoginClick} className="bg-slate-400 text-white text-3xl px-6 py-4 rounded-2xl hover:bg-slate-500 hover:scale-110 duration-100">
                        Order Now
                        <HiArrowNarrowRight className = 'inline-block ml-3' />
                    </button>
                }
            </div>
        </div>

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default Home
