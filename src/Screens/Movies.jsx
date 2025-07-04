import React from 'react'
import Shows from './Shows'
import requests from '../Request'

const Movies = () => {
  return (
    <Shows title="Movies" fetchURL={requests.fetchNetflixOriginals}/>
  )
}

export default Movies