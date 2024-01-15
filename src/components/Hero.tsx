import axios from 'axios'
import { useEffect, useState } from 'react'
import ENDPOINTS, { createImageUrl } from '../services/movieServices'

const Hero = () => {

  const [movie, setMovie] = useState<{ title: string, backdrop_path: string, release_date: string, overview: string }>({ title: '', backdrop_path: '', release_date: '', overview: '' })

  useEffect(() => {
    axios.get(ENDPOINTS.popular).then((resp) => {
      const movies = resp.data.results;
      const randomMovie = Math.floor(Math.random() * movies.length);

      setMovie(movies[randomMovie])
    })
  }, [])

  const truncate = (str: string, length: number) => {
    if (!str) return
    return str.length > length ? str.slice(0, length) + '...' : str
  }

  if (!movie)
    return (
      <p>fetching movie...</p>
    )

  const { title, backdrop_path, release_date, overview } = movie
  return (
    <div className='w-full h-[550px] lg:h-[850px]'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-[#292929]' />
        <img className='w-full h-full object-cover object-top' src={createImageUrl(backdrop_path, 'original')} alt={title} />
      </div>
      <div className='absolute w-full top-[20%] lg:top-[35%] p-4 md:p-8'>
        <h1 className='text-3xl md:text-6xl font-nsans-bold'>{title}</h1>
        <div className='mt-8 mb-4 flex gap-4'>
          <button className='capitalize border bg-gray-200 text-black py-2 px-5 pl-4'>play</button>
          <button className='capitalize border border-gray-300 py-2 px-5'>watch later</button>
        </div>
        <p className='text-gray-400 text-sm'>{release_date}</p>
        <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncate(overview, 165)}</p>
      </div>
    </div>
  )
}

export default Hero
