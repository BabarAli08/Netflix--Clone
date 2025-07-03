import React from 'react'
import Shows from './Shows'
import requests from '../Request'
const Tvshows = () => {
    console.log("request url ",requests.fetchHorrorMovies) 
  return (
    <>
    
    <Shows title="This is the tv shows component" fetchURL={requests.fetchTvShows} />
    </>

  )
}

export default Tvshows