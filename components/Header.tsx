import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import useAuth from '../custom_hooks/useAuth';


function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const {logout } = useAuth()

    

    useEffect(() => {
        const handleScroll =  () => {
            if(window.scrollY > 0) {
                setIsScrolled(true);
            }else {
                setIsScrolled(false);
            }
        }

        // clean up function for window event 

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


  return (
    <header className={`${isScrolled ? 'bg-[#141414]' : 'bg-transparent'}`}>
        {/* left section of nav */}
        <div className="flex  items-center space-x-2 md:space-x-10 z-50">
            <img
                src="/movie-net.png"
                width={140}
                height={140}
                className="cursor-pointer object-contain"
            />

            <ul  className="hidden space-x-4 md:flex ">
                <li className="headerLink">Home</li>
                <li className="headerLink">Tv Shows</li>
                <li className="headerLink">Movies</li>
                <li className="headerLink">New & Popular</li>
                <li className="headerLink"> My List</li>
            </ul>
        </div>

        {/* right sectoin of nav */}
        <div className="flex items-center space-x-4 text-sm text-white font-light">
            <MagnifyingGlassIcon className="hidden h-6 w-6  sm:inline "/>
            <p className="hidden lg:inline">Kids</p>
            <BellIcon className="h-6 w-6"/>
            {/* <Link href="/account"> */}
                <img src="https://rb.gy/g1pwyx" alt="" className="cursor-pointer rounded-md z-10" onClick={logout}/>
            {/* </Link> */}
        </div>
    </header>
  )
}


export default Header


