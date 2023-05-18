import { Component } from 'react'

export default class ServiceApi extends Component {
  constructor() {
    super()
    this.state = {
      url: new URL('https://api.themoviedb.org'),
      mainURL: 'https://api.themoviedb.org/3',
      apiKey: '71a10ef540506d7e0dfa55f2683f8514',
    }
  }
  async getAllMovies(movieName) {
    let url = new URL('3/search/movie', this.state.url)
    url.searchParams.set('api_key', this.state.apiKey)
    url.searchParams.set('query', movieName)
    try {
      const result = await fetch(url)
      if (!result.ok) throw new Error('Error send...')
      return await result.json()
    } catch (error) {
      console.log('Error', error)
    }
  }
  async getPageMovies(movieName, page) {
    let url = new URL('3/search/movie', this.state.url)
    url.searchParams.set('api_key', this.state.apiKey)
    url.searchParams.set('query', movieName)
    url.searchParams.set('page', page)
    try {
      const result = await fetch(url)
      if (!result.ok) throw new Error('Error send...')
      return await result.json()
    } catch (error) {
      console.log('Error', error)
    }
  }
  async getGenres() {
    let url = new URL('3/genre/movie/list', this.state.url)
    url.searchParams.set('api_key', this.state.apiKey)
    try {
      const result = await fetch(url)
      if (!result.ok) throw new Error('Error send...')
      return await result.json()
    } catch (error) {
      console.log('Error', error)
    }
  }
}
