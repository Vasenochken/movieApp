import { Component } from 'react'

import SearchPanel from '../search-panel/search-panel'
import ItemList from '../item-list/item-list'
import MyPagination from '../pagination/my-pagination'
import Offline from '../offline/offline'
import FilmNotFound from '../film-notfound/film-notfound'
import SpinLoad from '../spin-load/spin-load'

import './movies-list.css'

export default class MoviesList extends Component {
  constructor() {
    super()
    this.state = {
      queryMovie: '',
      dataMovies: [],
      filmNotFound: false,
      page: 0,
      totalPage: null,
      isLoading: true,
    }
  }

  searchMovie = (movieName) => {
    console.log('movieName: ', movieName)
    if (movieName.trim() !== '') {
      this.props
        .getAllMovies(movieName)
        .then((res) => {
          console.log('res: ', res)
          if (res.results.length !== 0) {
            this.setState({
              queryMovie: movieName,
              dataMovies: res.results,
              totalPage: res.total_pages,
              page: res.page,
              isLoading: false,
              filmNotFound: false,
            })
          } else {
            this.setState({
              queryMovie: movieName,
              dataMovies: res.results,
              totalPage: res.total_pages,
              page: res.page,
              isLoading: false,
              filmNotFound: true,
            })
          }
        })
        .catch((e) => {
          console.log(e)
          this.setState({ isLoading: true })
        })
    }
  }

  searchPageMovie = (movieName, numPage) => {
    this.props.getPageMovies(`${movieName}`, `${numPage}`).then((res) => {
      this.setState({
        queryMovie: movieName,
        dataMovies: res.results,
        totalPage: res.total_pages,
        page: res.page,
      })
    })
  }

  render() {
    const { dataMovies, totalPage, page, queryMovie, filmNotFound, isLoading } =
      this.state
    const { pageTab, sendRateStars } = this.props
    return (
      <div className="box">
        <SearchPanel searchMovie={this.searchMovie} />
        <Offline />
        {isLoading ? <SpinLoad /> : null}
        {dataMovies.length === 0 && filmNotFound ? <FilmNotFound /> : null}
        <div>
          <ul className="movies-list">
            {dataMovies.map((movie) => {
              return (
                <ItemList
                  poster={movie.poster_path}
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  dateRelease={movie.release_date}
                  description={movie.overview}
                  dataGenres={movie.genre_ids}
                  rating={movie.vote_average}
                  countStars={movie.rating}
                  sendRateStars={sendRateStars}
                />
              )
            })}
          </ul>
        </div>
        {dataMovies.length > 0 ? (
          <MyPagination
            pageTab={pageTab}
            searchPageMovie={this.searchPageMovie}
            page={page}
            totalPage={totalPage}
            queryMovie={queryMovie}
          />
        ) : null}
      </div>
    )
  }
}
