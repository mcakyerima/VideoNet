import { getProducts, Product } from "@stripe/firestore-stripe-payments"
import { GetStaticProps,  } from "next"
import Head from "next/head"
import Link from "next/link"
import Membership from "../components/Membership"
import useAuth from "../custom_hooks/useAuth"
import useSubscription from "../custom_hooks/useSubscription"
import payments from "../library/stripe"

function account({products}: { products : Product[]}) {
    console.log(products, " product from account")

    // call our subscription and pass user to fetch user created time
    const { user, logout } = useAuth()
    const subscription = useSubscription(user)
    const plan = products.filter((product) => product.id === subscription?.product)[0]?.name
    console.log('plan', plan)


  return (
    <div>
        <Head>
        <title>Account Settings - VideoNet</title>
        <link rel="icon" href="/vid.png" />
      </Head>

      <header className="bg-[#141414]">
        <Link href='/'>
            <img
                src="movie-net.png"
                width={120}
                height={120}
                className="cursor-pointer object-contain"
            />
        </Link>

        <Link href="/account">
            <img
                src="https://rb.gy/g1pwyx"
                className="cursor-pointer rounded"
                alt=""
            /> 
        </Link>
      </header>

      <main className=" max-w-4xl mx-auto pt-24 px-5 pb-12 transition-all md:px-10 ">
        <div className="pt-24 flex gap-x-4 items-center">
            <h1 className="text-3xl md:text-4xl">Account</h1>
            <div className="-ml-0.5 flex items-center gap-x-1.5 ">
                <img
                    className="h-7 w-7"
                    src="https://rb.gy/4vfk4r"
                    alt=""
                />
                <p className="text-xs font-semibold text-[#555]">Member since {subscription?.created}</p>

            </div>
        </div>
        <Membership/>
        
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0 ">
            <h4>
                Plan Details
                {/* find the current plan */}
            </h4>
            <div className="col-span-2 font-medium">
                { products.filter((product) => product.id === subscription?.product)[0]?.name}
            </div>
            <p className="cursor-pointer text-blue-500 hover:underline md:text-right">Change plan</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0 ">
            <h4 className="text-lg text-[gray]"> Settings</h4>
            <p className="cols-span-3 cursor-pointer text-blue-500 hover:underline" onClick={logout}>Sign out of all devices</p>
        </div>
      </main>
    </div>
  )
}   

export default account

export const getStaticProps: GetStaticProps = async () => {
    const products = await getProducts(payments, { 
        includePrices: true, 
        activeOnly: true
    }).then((res) => res).catch((error) => console.log(error.message))

    return {
        props: {
            products
        }
    }       
}