import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../custom_hooks/useAuth";
import { useRouter } from 'next/router'
import Loader from "../components/loader";

interface Inputs { 
    email: string
    password: string
}

function login() {
    const [login, setLogin] = useState(false)
    const [loading , setLoading ] = useState(false)
    const { asPath } = useRouter()

    // import errror from firebase for login button handling
 
    const { error } = useAuth()

    console.log("error message" , error)
    
    // use our cusom hook
    const {signIn , signUp } = useAuth()

    // React Hook form custom hook 
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({email , password }) => {
        if(login){
            await signIn(email, password)
        }else {
           await signUp(email, password)
        }
    }


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

      <form onSubmit={handleSubmit(onSubmit)} className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14" > 
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
            <label className="inline-block w-full">
                <input 
                type="email"
                placeholder="Email"
                className="input"
                {...register('email', {required: true})}
                
                />

                {errors.email && <p className="p-1 text-[13px] font-light text-orange-500">Please enter a valid email address</p>}
            </label>
            <label className="inline-block w-full">
                <input 
                    type="password"
                    className="input"
                    placeholder="Password"
                    {...register('password', {required: true})}

                />
                {errors.password && 
                    <p className="p-1 text-[13px] font-light text-orange-500">
                        Your Password must be between 5 to 15 characters.
                    </p>}
            </label>
        </div>

        <button type="submit" className="w-full rounded-lg bg-[#e50914] py-3 font-semibold" onClick={() => {setLogin(true); setLoading(true);}}>
          
          {loading && error == null ? <Loader text="Logging in" color="dark:fill-gray-300"/> : 'Sign In'}
        </button>

          { error ? <p className="p-1 text-[15px] font-light text-red-500 ">User not found, Please sign up</p> : ''}
          
        <div className="text-gray-300">
            New To Movie-Net?
            <button type="submit" onClick={() => setLogin(false)} className="ml-3 text-white hover:underline">Sign up now</button>
        </div>
      </form> 
    </div>
  )
}

export default login
