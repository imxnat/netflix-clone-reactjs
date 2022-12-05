import React, { useEffect, useState } from 'react'
import requests from '../Requests';

function Main() {

    const [movies, setMovies] = useState([]);
    
// get one random movie everytime the page its refresh
    const movie = movies[Math.floor(Math.random() * movies.length)];


// fetch and get movies data
    useEffect(() => {
      const fetchMovies = async() => {
        try {
           const response = await fetch(requests.requestPopular);
           const movies = await response.json();
           setMovies(movies.results)
         } catch(error) {
           console.error("Failed to fetch data! ", error)
         }
       }
      fetchMovies();
      
    }, [])

    // acortar texto de overview
    const truncateString = (str, num) => {
      if (str?.length > num) {
        return str.slice(0, num) + '...';
      } else {
        return str;
      }
    };

  return (
    <div className='w-full h-[550px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
        <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
        
  {/* Movie description and buttons */}
      <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
        <div className='my-4'>
          <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>Play</button>
          <button className='border text-white ml-4 border-gray-300 py-2 px-5'>Watch Later</button>
        </div>
        <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
        <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncateString(movie?.overview, 150)}</p>
      </div>
      </div>
    </div>
  )
}

export default Main