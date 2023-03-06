import { Component } from 'react'

import ItemList from '../item-list/item-list'

import './movies-list.css'

export default class MoviesList extends Component {
  render() {
    const { dataMovies } = this.props
    return (
      <ul className="movies-list">
        {dataMovies.map((movie) => {
          return (
            <ItemList
              key={movie.id}
              title={movie.title}
              dateRelease={movie.release_date}
              description={movie.overview}
            />
          )
        })}
      </ul>
    )
  }
}
