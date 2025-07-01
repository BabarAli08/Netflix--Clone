import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Row from '../components/Row'
import requests from '../Request'

const Homescreen = () => {
  return (
    <>
    <Navbar/>
    <Banner/>
     <Row title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies}/>
      <Row title="Trending" fetchURL={requests.fetchTrending}/>
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies}/>
      <Row title="Documentries" fetchURL={requests.fetchDocumentries}/>
       <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies}/>
      <Row title="Romentic Movies" fetchURL={requests.fetchRomenticMovies}/>
       <Row title="Top Rated" fetchURL={requests.fetchTopRated}/>
    </>
  )
}

export default Homescreen