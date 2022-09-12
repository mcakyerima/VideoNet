import Image   from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/imageBaseUrl'
import { Movie } from '../typings'
import { FaPlay} from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtoms'

interface Props {
    netflixOriginals: Movie[]
}

function Banner({ netflixOriginals } : Props) { 
    const [movie, setMovie] = useState<Movie | null>(null)

    const [ currentMovie , setCurrentMovie ] = useRecoilState(movieState)
    const [showModal , setShowModal] = useRecoilState(modalState)

    // get a random movie for banner everytime we reload

    useEffect(() => {    
        // choose a random index with basic js
        if(netflixOriginals){
             setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
        }
    },[netflixOriginals])
    

  return (
    <div className="flex flex-col space-y-2 py-16  md:space-y-4 lg:h-[69vh] lg:justify-end lg:pb-12 ">
        <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
            <Image 
                src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                layout="fill"
                objectFit='cover'
                />
        </div>
        <div className=" space-y-4">
            <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl mt-12">{movie?.title || movie?.name || movie?.original_name}</h1>
            <p className="max-w-xs text-xs text-shadow-md md:max-w-lg mg:text-lg lg:max-w-2xl lg:text-xl">{movie?.overview}</p>

            <div className="flex gap-3">
                <button className="bannerButton bg-white text-black">
                    <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7"/>
                    Play
                    
                </button>
                <button className="bannerButton bg-[gray]/70"
                    onClick={ () => {
                        setCurrentMovie(movie)
                        setShowModal(true)
                    }}
                >
                    More Info
                    <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8"/>    
                </button>
        </div>
      
        </div>
    </div>
  )
}

export default Banner