import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'


function Header() {
  return (
    <header>
        {/* left section of nav */}
        <div className="flex  items-center space-x-2 md:space-x-10">
            <img
                src="https://rb.gy/ulxxee"
                width={100}
                height={100}
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
            <Link href="/account">
                <img src="https://rb.gy/g1pwyx" alt="" className="cursor-pointer rounded-md" />
            </Link>
        </div>
    </header>
  )
}


export default Header


