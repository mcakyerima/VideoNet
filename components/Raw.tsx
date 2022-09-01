import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { useRef, useState } from "react"
import { Movie } from "../typings"
import Thumbnails from "./Thumbnails"

interface Props {
    title: String 
    movies: Movie[]
}
function Raw({title, movies}: Props ) {
    const row_reference = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false)

    // click function

    const handleClick = (direction: String) => {
        setIsMoved(true)

        if(row_reference.current) {
            const { scrollLeft, clientWidth} = row_reference.current

            // scroll based on direction recieved
            const scrollCalculation = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

            row_reference.current.scrollTo({left: scrollCalculation, behavior: 'smooth'})

        }
      
    }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
        <h1 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h1>
        <div className="group relative md:-ml-2">
            <ChevronLeftIcon className={ `absolute top-0 bottom-0 left-2 z-40 m-auto h-9  cursor-pointer  transition opacity-5 hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'}`}  onClick= {() => handleClick("left")} />
            <div ref={row_reference} className="flex item-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
                {movies.map((movie) => (
                <Thumbnails  key={movie.id} movie={movie}/>
                ))}
            </div>

            <ChevronRightIcon className="absolute top-0 bottom-0 right-2 z-50 m-auto h-9  cursor-pointer  transition opacity-5 hover:scale-125 group-hover:opacity-100"  onClick= {() => handleClick("right")}/>
        </div>
    </div>
  )
}

export default Raw