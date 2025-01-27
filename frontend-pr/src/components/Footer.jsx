import React from 'react'

const Footer = () => {
  return (
    <div name='Footer' className='bottom-0 flex flex-col w-full bg-slate-800 text-white'>
        <div className='p-6 pl-36 pr-36 grid md:grid-cols-2 justify text-lg'>

            {/* Left */}
            <div className='md:pl-52 md:pr-12 space-y-4'>
                <div className='justify-center'>
                    <h2 className="text-xl font-bold">Contact Us</h2>
                    <p className='text-slate-400'>Email: info@yourwebsite.com</p>
                    <p className='text-slate-400'>Phone: +123 456 789</p>
                </div>
                
                <div className='justify-center pb-4'>
                    <h2 className="text-xl font-bold">Follow Us</h2>
                    <div className='flex space-x-4'>
                        <a href='#' className='hover:text-slate-400'>
                            <img src='https://img.icons8.com/ios-glyphs/30/ffffff/facebook-new.png' alt='Facebook' />
                        </a>
                        <a href='#' className='hover:text-slate-400'>
                            <img src='https://img.icons8.com/ios-glyphs/30/ffffff/instagram-new.png' alt='Instagram' />
                        </a>
                        <a href='#' className='hover:text-slate-400'>
                            <img src='https://img.icons8.com/ios-glyphs/30/ffffff/twitter.png' alt='Twitter' />
                        </a>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className='md:pl-12 md:pr-12 space-y-4'>                
                <div className='justify-center'>
                    <h2 className="text-xl font-bold">Address</h2>
                    <p className='text-slate-400'>123 Street Name</p>
                    <p className='text-slate-400'>City, Country</p>
                </div>
                <div>
                    <p>Copyright ©2025 Tahu Bulat™</p>
                    <p>Proudly created with TailwindCSS</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Footer
