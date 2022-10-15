import { onCurrentUserPaymentUpdate, onCurrentUserSubscriptionUpdate, Subscription } from "@stripe/firestore-stripe-payments"
import { User } from "firebase/auth";
import { useEffect, useState } from "react"
import payments from "../library/stripe";

function useSubscription(user : User | null) {
    const [ subscription , setSubscription ] = useState<Subscription | null >(null);
    
    useEffect(() => {
        // if no user, jump out
        if(!user) return

        // payment event listener for stripe subscription
        onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
            // filter through subsction and check for subscription status that is active or trialing that return a boolean true of false base on the filter
            setSubscription(
                snapshot.subscriptions.filter(
                    (subscription) => subscription.status === 'active' ||
                     subscription.status === 'trialing')[0]
            )
        })

    },[user])
    console.log("subscription data", subscription)

  return subscription
} 

export default useSubscription 