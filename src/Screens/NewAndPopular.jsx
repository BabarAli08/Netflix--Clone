import React from 'react'
import Shows from './Shows'
import requests from '../Request'

const NewAndPopular = () => {
  return (
    <Shows title="New And Popular" fetchURL={requests.fetchTrending}/>
  )
}

export default NewAndPopular