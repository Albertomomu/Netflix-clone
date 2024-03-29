import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import { db } from '../services/firebase'
import { createImageUrl } from '../services/movieServices'
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface Movie {
  id: string;
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
}


const Profile = () => {
  const [movies, setMovies] = useState([])
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows)
      })
    }
  }, [user?.email])

  if (!user) {
    return (
      <p>Fetching shows</p>
    )
  }
  const slide = (offset: number) => {
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider?.scrollLeft + offset
  }

  const handleUnlikeShow = async (movie: Movie) => {
    const userDoc = doc(db, 'users', `${user.email}`)
    await updateDoc(userDoc, {
      favShows: arrayRemove(movie)
    })
  }

  return (
    <>
      <div>
        <img
          className='block w-full h-[500px]'
          src="../../public/loginBG.jpg" alt="" />
      </div>
      <div className='bg-black/60 fixed top-0 left-0 w-full h-[500px]' />
      <div className='absolute top-[20%] p-4 md:p-8 font-nsans-bold my-2'>
        <h1>My shows</h1>
        <p className='font-nsans-light text-gray-400 text-lg'>{user.email}</p>
      </div>
      <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>Fav</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft onClick={() => { slide(-500) }} size={40} className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' />
        <div id={`slider`} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {movies.map((movie: Movie) => (
            <>
              <div key={movie?.id} className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
                <img className='w-full h-40 block object-cover object-top' src={createImageUrl(movie?.backdrop_path ?? movie?.poster_path, "w500")} alt={movie?.title} />
                <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100 transition'>
                  <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>{movie?.title}</p>
                  <p>
                    <AiOutlineClose
                      size={20}
                      onClick={() => {
                        updateDoc(doc(db, 'users', `${user.email}`), {
                          favShows: arrayRemove(movie)
                        })
                      }}
                      className='absolute top-2 right-2'
                    />
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
        <MdChevronRight onClick={() => { slide(500) }} size={40} className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' />
      </div>
    </>
  )
}

export default Profile
