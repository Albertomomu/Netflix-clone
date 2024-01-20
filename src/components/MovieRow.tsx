import axios from 'axios'
import { useEffect, useState } from 'react'
import MovieItem from './MovieItem'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const MovieRow = ({ title, url }: { title: string, url: string }) => {
  const [movies, setMovies] = useState<{ id: number, title: string, url: string, backdrop_path: string, poster_path: string, release_date: string, vote_average: number, overview: string, genre_ids: number[] }[]>([])

  useEffect(() => {
    axios.get(url).then((response) => setMovies(response.data.results))
  }, [url])

  const slide = (offset) => {
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider?.scrollLeft + offset
  }
  return (
    <>
      <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>{title}</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft onClick={() => { slide(-500) }} size={40} className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' />
        <div id={`slider`} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight onClick={() => { slide(500) }} size={40} className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' />
      </div>
    </>
  )
}

export default MovieRow
