import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import ENDPOINTS from '../services/movieServices'

const Home = () => {
  return (
    <>
      <Hero />
      <MovieRow title="upcoming" url={ENDPOINTS.upcoming} />
      <MovieRow title="trending" url={ENDPOINTS.trending} />
      <MovieRow title="top rated" url={ENDPOINTS.topRated} />
      <MovieRow title="comedy" url={ENDPOINTS.comedy} />
      <MovieRow title="popular" url={ENDPOINTS.popular} />
    </>
  )
}

export default Home
