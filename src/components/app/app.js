import { Component } from 'react'

import ServiceApi from '../../service/service'
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
    }
    this.api = new ServiceApi()
  }

  changePage = (tab) => {
    this.setState({
      pageTab: tab,
    })
  }

  getGenres = () => {
    this.api.getGenres().then((res) => this.setState({ genres: res.genres }))
  }

  componentDidMount() {
    this.getGenres()
  }

  render() {
    const { genres, pageTab } = this.state
    const viewTab = (pageTab) => {
      if (pageTab === 'search') return <MoviesList />
      else if (pageTab === 'rated') return <RatedList />
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
