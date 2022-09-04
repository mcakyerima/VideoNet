import Head from "next/head"
import Image from "next/image"
import { useState } from "react"

function login() {
    const [login, setLogin] = useState(false)


  return (
    <div className="relative flex flex-col h-screen w-screen bg-black md:items-center md:justify-center md:bg-transparent">
        <Head>
        <title>Movie-Net</title>
        <link rel="icon" href="/vid.png" />
      </Head>

      <Image
        src='https://rb.gy/p2hphi'
        layout='fill'
        className='-z-10 !hidden opacity-60 sm:!inline'
        objectFit="cover"
      />

      <img
        src='/movie-net.png'
        className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
        width={150}
        height={150}
      />


      {/* login form */}

      <form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14" > 
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
            <label className="inline-block w-full">
                <input type="email" placeholder="Email" className="input"/>
            </label>
            <label className="inline-block w-full">
                <input type="password" className="input" placeholder="Password"/>
            </label>
        </div>

        <button className="w-full rounded-lg bg-[#e50914] py-3 font-semibold">Sign In</button>

        <div className="text-gray-600">
            New To VidoeNet?
            <button type="submit" className="ml-3 text-white hover:underline">Sign up now</button>
        </div>
      </form>
    </div>
  )
}

export default login