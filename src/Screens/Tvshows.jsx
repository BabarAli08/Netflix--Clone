import React from 'react'
import Shows from './Shows'
import requests from '../Request'
const Tvshows = () => {
    console.log("request url ",requests.fetchHorrorMovies) 
  return (
    <>
    
    <Shows title="Tv shows" fetchURL={requests.fetchTvShows} />
    </>

  )
}

export default Tvshows