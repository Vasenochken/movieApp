import { Component } from 'react'

export default class ServiceApi extends Component {
  async getResource(url) {
    const result = await fetch(url)
    if (!result.ok) throw new Error('Error!!!!!!')
    return await result.json()
  }
  getAllMovies() {
    return this.getResource(
      'https://api.themoviedb.org/3/search/movie?api_key=71a10ef540506d7e0dfa55f2683f8514&language=en-US&query=return&page=1&include_adult=false',
    )
  }
}
