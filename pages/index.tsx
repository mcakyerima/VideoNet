
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import requests from '../utils/requests'
import { Movie } from '../typings'
import Raw from '../components/Raw'
import useAuth from '../custom_hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtoms'
import Modal from '../components/Modal'
import { FaPlaneSlash } from 'react-icons/fa'
import Plan from '../components/Plan'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments from '../library/stripe'
import useSubscription from '../custom_hooks/useSubscription'



interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  products: Product[]

}

const Home = ({ 
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products }: Props) => {
    

    const showModal = useRecoilValue(modalState)

    // check loading state and import user for subscription validation

    const { user, loading } = useAuth()

    // dummy value for subsription....if no subscription...dnt show home components
    const subscription = useSubscription(user);
    console.log("subscription data " , subscription)

    console.log(netflixOriginals)


    if ( loading || subscription === null ) return null

    // if user not subscribed? return to subscrition page
    if (!subscription) return <Plan products={products}/>

  return (
    <div className="relative h-screen bg-gradient-to-b  lg:h-[140vh] ">
      <Head>
        <title>Home - VideoNet</title>
        <link rel="icon" href="/vid.png" />
      </Head>
      {/* header  */}
      <Header/>
      
      <main className="relative pl-4 pb-24 lg:pl-16">
        {/* Banner */}
          <Banner netflixOriginals={netflixOriginals}/>
          
          <section className="md:space-y-24">
              <Raw title="Comedies" movies={trendingNow}/>
              <Raw title="Scary Movies" movies={topRated}/>
              <Raw title="Action Thriller" movies={actionMovies}/>
              {/* Movie List Component */}
              <Raw title="commedies" movies={comedyMovies}/>
              <Raw title="Horror Movies" movies={horrorMovies}/>
              <Raw title="Romance Movies" movies={romanceMovies}/>
              <Raw title="Documentaries" movies={documentaries}/>
          </section>
      </main>
      {/* Modal */}
      {showModal && <Modal/>}

    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
// get products from firebase 
const products = await getProducts(payments, { 
  includePrices: true,
  activeOnly: true
}).then((res) => res).catch((error) => console.log(error.message));

  const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,    
   ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products
    },
  }
}
  