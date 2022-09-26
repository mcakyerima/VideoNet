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

// export loadCheckout as named export and export default the payments functon

export { loadCheckout };
export default payments