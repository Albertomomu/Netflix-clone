import { useState } from 'react';
import { createImageUrl } from '../services/movieServices'
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase';
import { UserAuth } from '../context/AuthContext';



interface Movie {
  title: string;
  backdrop_path: string;
  poster_path: string;
}

const MovieItem: React.FC<{ movie: Movie }> = ({ movie }) => {

  const { user } = UserAuth()

  const markFavShow = async () => {
    const userEmail = user?.email

    if (userEmail) {
      const userRef = doc(db, 'users', userEmail)
      await updateDoc(userRef, {
        favShows: arrayUnion(movie.title)
      })
    }
  }


  const [like, setLike] = useState(false)
  const { title, backdrop_path, poster_path } = movie
  return (
    <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
      <img className='w-full h-40 block object-cover object-top' src={createImageUrl(backdrop_path ?? poster_path, "w500")} alt={title} />
      <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100 transition'>
        <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>{movie.title}</p>

        <p
          onClick={() => {
            setLike(!like);
            markFavShow();
          }}>{like ? <FaHeart size={20} className="absolute top-2 left-2 text-gray-300" /> : <FaRegHeart size={20} className="absolute top-2 left-2 text-gray-300" />}</p>
      </div>
    </div>
  )
}

export default MovieItem
