import { Component } from 'react'

import ServiceApi from '../../service/service'
import GuestSession from '../../service/guest-session'
import MyContext from '../context/context'
import ToggleTab from '../toggle-tab/toggle-tab'
import MoviesList from '../movies-list/movies-list'
import RatedList from '../rated-list/rated-list'

import './app.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      pageTab: 'search',
      genres: [],
      guestToken: '',
      dataRated: {
        moviesRated: [],
        totalPage: 0,
        page: 1,
      },
    }
    this.api = new ServiceApi()
    this.guest = new GuestSession()
  }

  changePage = (tab) => {
    this.setState({
      pageTab: tab,
    })
  }

  getGenres = () => {
    this.api
      .getGenres()
      .then((res) => this.setState({ genres: res.genres }))
      .catch((e) => console.log(e.name))
  }

  getToken = () => {
    this.guest
      .getToken()
      .then((token) => {
        if (localStorage.getItem('guest') === token) {
          // localStorage.setItem('guest', `${token}`)
          this.setState({ guestToken: token })
        } else {
          localStorage.setItem('guest', `${token}`)
          this.setState({ guestToken: token })
        }
      })
      .catch((e) => console.log(e.name))
  }

  getAllMovies = (movieName) => {
    return this.api.getAllMovies(`${movieName}`)
  }

  getPageMovies = (movieName, numPage) => {
    return this.api.getPageMovies(`${movieName}`, `${numPage}`)
  }

  sendRateStars = (id, countStars) => {
    this.guest
      .postRateStars(this.state.guestToken, id, countStars)
      .catch((e) => e.name)
  }

  getGuestSession = (page = 1) => {
    return this.guest.getSession(this.state.guestToken, page)
  }

  getPageSession = (page) => {
    return this.api.getSession(this.state.guestToken, page)
  }

  async componentDidMount() {
    await this.getGenres()
    await this.getToken()
  }

  render() {
    // console.log(this.state)
    const { genres, pageTab } = this.state
    const viewTab = (pageTab) => {
      if (pageTab === 'search')
        return (
          <MoviesList
            pageTab={pageTab}
            sendRateStars={this.sendRateStars}
            getAllMovies={this.getAllMovies}
            getPageMovies={this.getPageMovies}
          />
        )
      else if (pageTab === 'rated')
        return (
          <RatedList
            pageTab={pageTab}
            getGuestSession={this.getGuestSession}
            getPageSession={this.getPageSession}
          />
        )
    }
    return (
      <MyContext.Provider value={genres}>
        <section className="movie-app">
          <ToggleTab changePage={this.changePage} active={pageTab} />
          {viewTab(pageTab)}
        </section>
      </MyContext.Provider>
    )
  }
}
