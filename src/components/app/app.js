import { Component } from 'react'

import ServiceApi from '../../service/service'
import MoviesList from '../movies-list/movies-list'
// import ButtonsSwitch from '../buttons-switch/buttons-switch'
// import SearchPanel from '../search-panel/search-panel'
import './app.css'
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      movies: [],
      isLoaded: false,
    }
    this.api = new ServiceApi()
  }
  componentDidMount() {
    this.api.getAllMovies().then((body) => {
      this.setState({
        isLoaded: true,
        movies: body.results,
      })
    })
  }
  render() {
    const { movies } = this.state
    return (
      <section className="movie-app">
        {/* <ButtonsSwitch />
        <SearchPanel /> */}
        <MoviesList dataMovies={movies} />
      </section>
    )
  }
}
