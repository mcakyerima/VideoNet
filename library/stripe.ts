import {
    createCheckoutSession,
    getStripePayments,
  } from '@stripe/firestore-stripe-payments'
  import { getFunctions, httpsCallable } from '@firebase/functions'
  import app from '../firebase'

//   this function allow us to retrieve the payments in firebase and pass to stripe createCheckoutSession function
const payments = getStripePayments(app, { 
    productsCollection: 'products',
    customersCollection: 'customers'
   })

// load checkout function for processing paynent insde our plan component that redirects the user to stripe portal for payment
const loadCheckout = async (priceId: string) => {
    await createCheckoutSession(payments,{
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin
    }).then((snapshot) => window.location.assign(snapshot.url)).catch((error) => console.log(error.message));
}

// got to billing pottal to adjust subscription all code snippets 
// below are from the stripe extension firebase
const goToBillingPortal = async () => {
    const instance = getFunctions(app, "us-central1")
    // another function to redirect user to stripe portal..{code from stripe extension firebase docs}
    const functionRef = httpsCallable(instance,'ext-firestore-stripe-payments-createPortalLink')

    await functionRef({
        returnUrl: `${window.location.origin}/account`
    }).then(({data}: any)=> window.location.assign(data.url)).catch((error)=> console.log(error.message))
}


// export loadCheckout as named export and export default the payments functon

export { loadCheckout, goToBillingPortal };
export default payments