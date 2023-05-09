import { Component } from 'react'

import ServiceApi from '../../service/service'
import ItemList from '../item-list/item-list'

import './rated-list.css'

export default class RatedList extends Component {
  constructor() {
    super()
    this.state = {
      dataRated: [],
    }
    this.api = new ServiceApi()
  }

  getGuestSession = () => {
    this.api.getSession(localStorage.getItem('гость')).then((res) => {
      this.setState({ dataRated: res.results })
    })
  }

  componentDidMount() {
    this.getGuestSession()
  }

  render() {
    const { dataRated } = this.state
    return (
      <ul className="movies-list">
        {dataRated.map((movie) => {
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
              rete={movie.rating}
              countStars={movie.rating}
            />
          )
        })}
      </ul>
    )
  }
}
