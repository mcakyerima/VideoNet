import { CheckIcon } from "@heroicons/react/24/solid"
import { Product } from "@stripe/firestore-stripe-payments"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import useAuth from "../custom_hooks/useAuth"
import Table from "./Table"
import Loader from './loader'
import { loadCheckout } from "../library/stripe"

interface Props {
    products: Product[]
    selectedPlan: Product | null
}

function Plan({ products }: Props) {
    console.log(products, "in plan")
    const { logout,user } = useAuth()
    const [ billingLoading , setBillingLoading ] = useState(false)
    const [selectedPlan , setSelectedPlan ] = useState<Product | null>(products[2])

    const handleClick = (product) => {
        console.log('prodoct id', product)
        const index = products.findIndex((element) => element.id === product)
        console.log(index)
        setSelectedPlan(products[index])
    }

    const subscribeToPlan = () => {
        // protect payent if no user account
        if(!user) return

        // call our stripe loadCheckout function that accepts priceID parameter
        loadCheckout(selectedPlan?.prices[0].id!)
        // set our billingLoading to true and display spinner on button 
        setBillingLoading(true)
    }

    return (
        <div>
            <Head>
                <title>VideoNet</title>
                <link rel="icon" href="/vid.png" />
            </Head>

            <header className="border-b border-white/10 bg-[#141414]">
                <Link href="/">
                    <img
                        src="/movie-net.png"
                        alt="videonet"
                        width={130}
                        height={130}
                        className="cursor-pointer object-contain"
                    />
                </Link>

                <button onClick={logout} className="text-lg font-medium hover:underline">Sign Out</button>
            </header>

            {/* plans table */}
            <main className="pt-28 max-w-5xl mx-auto px-5 pb-12 transition-all md:px-10">
                <h1 className="mb-3 text-3xl font-medium">Choose the plan thats right for you</h1>
                <ul>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" />
                        Watch all you want Add-free
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" />
                        Recommendations just for you.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" />
                        Change or Cancel your plan anytime.
                    </li>
                </ul>

                <div className="flex flex-col space-y-4 mt-4">
                    <div className="flex w-full items-center justify-end self-end md:w-3/5">
                        {products.map((product) => (
                            <div onClick={ () => setSelectedPlan(product)} key={product.id} className={`planContainer ${selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"}`}>{product.name}</div>
                        ))}
                    </div>

                    <Table products={products} selectedPlan={selectedPlan}/>

                    <button 
                        disabled={!selectedPlan || billingLoading}
                        className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shaodw hover:bg:[#f6121d] md:[420px] ${
                            billingLoading && 'opacity-60'
                        }`} 
                            onClick={subscribeToPlan}
                        >

                        {billingLoading ? (
                            <Loader text="processing" color="dark:fill-gray-300"/>
                        ): 
                        
                        "Subscribe"
                    }

                       </button>
                </div>
            </main>  
        </div>
    )
}

export default Plan