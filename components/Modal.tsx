import { CheckIcon, HandThumbUpIcon, PlusIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import MuiModal from '@mui/material/Modal'
import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaPlay, FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtoms'
import useAuth from '../custom_hooks/useAuth';
import { db } from '../firebase';
import { Element, Movie, Genre } from '../typings';


function Modal() {
    const [showModal , setShowModal ]  = useRecoilState(modalState);
    const [ movie , setMovie ] = useRecoilState(movieState);
    const [trailer , setTrailer ] = useState('')
    const [ genres , setGenres ] = useState<Genre[]>([])
    const [ muted , setMuted ] = useState(true)
    const [ addedToList , setAddedToList ] = useState(false);

    // get the current user
    const { user } = useAuth()


    // useEffect hook to fetch individual movies 
    useEffect(() => {
        // if (!movie) return;

        async function fetchMovies () {
            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === 'tv' ? 'tv' : 'movie'
                  }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                  }&language=en-US&append_to_response=videos`
            ).then((response) => response.json())


            if(data?.videos) {
              // find the index of the object containing trailer and get the key to the youtube trailer video
              // in the data.videos.results array {}
              const index = data.videos?.results.findIndex((element: Element) => element.type === 'Trailer');
             setTrailer(data.videos?.results[index]?.key)
            }

            // set genre
            if(data?.genres){
              setGenres(data.genres)
            }
        }

        fetchMovies()
    },[movie])

    const handleList = async () => {
      if (addedToList) {
        // if added to list and user clicks the button, delete the movie from myList
        // in firebase
         await deleteDoc(doc(db, "customers", user!.uid, "myList",movie?.id.toString()!))
      }
    }

    console.log("trailer link" , trailer)
    console.log("genres" , genres)

    const handleClose = () => {
        setShowModal(false);
    }
 
  return (
    <MuiModal open={showModal} onClose={handleClose} className="relative !top-7 left-0  right-0 z-50 mx-auto !w-full max-w-4xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
         <>
            <button onClick={handleClose} className="modalButton absolute right-5 top-5 z-40 h-9 w-9 border-none bg-[#181818] rounded-full flex items-center justify-center hover:bg-[#181818]">
                <XMarkIcon className="h-6 w-6"/>
            </button>

            <div className="relative pt-[56.24%] ">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer}`}
                  width="100%"
                  height="100%"
                  style={{position: 'absolute', top: '0', left: '0'}}
                  playing
                  muted={muted}
                />
                
                <div className="absolute bottom-10 flex w-full  items-center justify-between px-9 pr-20">
                  <div className="flex space-x-2">
                    <button className="flex items-center  gap-x-2 rounded-full bg-white px-6 py-1 text-xl font-bold text-black hover:bg-[#e6e6e6]">
                      <FaPlay className="h-7 w-7 text-black"/>
                      Play
                      </button>

                      <button className="modalButton" onClick={handleList}>
                      {
                            addedToList ? (
                             <CheckIcon className="h-7 w-7"/>
                            ) : (
                             <PlusIcon className="h-7 w-7"/>
                            )
                           }
                      </button>
                          
                      <button className="modalButton">
                        <HandThumbUpIcon className="h-7 w-7"/>
                      </button>
                  </div>

                  <button className="modalButton" onClick={() => setMuted(!muted)}>
                    { muted ? (
                      <FaVolumeUp className="h-6 w-6"/>
                    ): (
                      <FaVolumeMute className="h-6 w-6"/>
                    ) }
                  </button>
                </div>
            </div>
            <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
              <div className="text-lg space-y-8">
              <div className="flex items-center space-x-2 text-sm">
                    <p className="font-semibold text-green-400 ">{movie?.vote_average * 10 }% Match</p>
                    <p className="font-light">{movie?.release_date || movie?.first_air_date}</p>
                    <div className="flex h-4 items-center justify-center rounded border border-white/40 text-xs px-1.5">HD</div>
                  </div>

                  <div className="flex flex-col gap-10 gap-y-4 font-light md:flex-row">
                    <p className="w-5/6">{movie?.overview}</p>
                    <div className="flex flex-col space-y-3 text-sm">
                      <div>
                        <span className="text-[gray]"> Genres    </span>
                        {genres.map((genres) => genres.name).join(', ')}
                      </div>

                      <div>
                        <span className="text-[gray]">Original Language:  </span>
                        {movie?.original_language}

                        <div>
                          <span className="text-[gray]">Vote Count:   </span>
                          {movie?.vote_count}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
                  
            </div>
         </>
    </MuiModal>
  ) 
}

export default Modal 