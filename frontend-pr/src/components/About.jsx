import React from 'react'
import Footer from './Footer'
import DENGO from '../assets/Dengo.png'
import FREAKY from '../assets/freaky.png'
import TONYSTANK from '../assets/tonystank.png'

const About = () => {
    
  return (
    <div name='About' className='justify-center w-full pt-12 bg-white flex flex-col'>
        
        {/* About Us + Picture */}
        <div className='relative w-full h-[67vh] pt-24 my-12 mx-auto bg-white flex items-center'>
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-75"
                style={{
                backgroundImage: "url('https://www.dapurkobe.co.id/wp-content/uploads/tahu-bulat-saus-mentega.jpg')",
                }}>

            </div>

            {/* Text Content */}
            <div className="relative z-10 max-w-lg p-6 text-left bg-slate-300 bg-opacity-75 border-0 rounded-xl left-16 md:left-32">
                <h2 className="text-2xl font-bold text-black">Our Vision</h2>
                <p className="text-black mt-2 text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>

        </div>

        {/* About Us */}
        <div className='my-12 h-auto w-full py-12 flex-col flex'>
            <div className='md:grid md:grid-cols-2'>
                <div className='md:text-right px-12'>
                    <h1 className="text-4xl font-bold border-b-4 border-black inline">About Us</h1>
                </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:py-4 px-12'>
                <p className="text-4xl md:text-right text-left md:px-12 md:py-0 py-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
                <p className="text-lg justify-center md:text-left m-auto p-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
        </div>

        {/* Our Team */}
        <div className='my-16 justify-center items-center flex flex-col'>
            <h1 className="text-4xl font-bold italic border-b-4 border-slate-600 inline-block">Our Team:</h1>
            <div className="relative w-full py-8 overflow-x-hidden flex items-center justify-center bg-slate-500 my-4">
                {/* Carousel Wrapper */}
                <div id='carousel' className="flex space-x-4 w-max transition-transform duration-300 ease-in-out no-scrollbar">
                    {/* Card */}
                    {[
                        {
                            name: 'John Dengo',
                            img: DENGO,
                            title: 'CEO of Tahu Bulat'
                        },
                        {
                            name: 'Freaky Jane',
                            img: FREAKY,
                            title: 'Secretary of Tahu Bulat'
                        },
                        {
                            name: 'Tony Stank',
                            img: TONYSTANK,
                            title: 'Manager of Tahu Bulat'
                        },
                    ].map((item, index) => (
                        <div key={index} className="w-[300px] bg-slate-300 hover:scale-110 duration-100 px-1 py-4 border-0 border-slate-300 rounded-xl flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold py-3">{item.name}</h1>
                            <img src={item.img} alt={item.name} className="w-[200px] h-[200px] object-top object-cover border-0 rounded-lg pb-4" />
                            <p className='text-lg'>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default About
