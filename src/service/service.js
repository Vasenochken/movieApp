import { Component } from 'react'

export default class ServiceApi extends Component {
  constructor() {
    super()
    this.state = {
      mainURL: 'https://api.themoviedb.org/3',
      apiKey: '71a10ef540506d7e0dfa55f2683f8514',
    }
  }
  async getResource(url) {
    const result = await fetch(url)
    if (!result.ok)
      throw new Error(`Could not fetch ${url}`, `received ${result.status}`)
    return await result.json()
  }
  async getAllMovies(movieName) {
    const res = await this.getResource(
      `${this.state.mainURL}/search/movie?api_key=${this.state.apiKey}&language=en-US&query=${movieName}&include_adult=false`,
    )
    return res
  }
  async getPageMovies(movieName, page) {
    const res = await this.getResource(
      `${this.state.mainURL}/search/movie?api_key=${this.state.apiKey}&language=en-US&query=${movieName}&page=${page}&include_adult=false`,
    )
    return res
  }
  async getGenres() {
    const res = await this.getResource(
      `${this.state.mainURL}/genre/movie/list?api_key=${this.state.apiKey}&language=en-US`,
    )
    return res
  }
  async getToken() {
    if (localStorage.getItem('гость')) return
    const token = await this.getResource(
      `${this.state.mainURL}/authentication/guest_session/new?api_key=${this.state.apiKey}`,
    )
    localStorage.setItem('гость', token.guest_session_id)
  }
  async getSession(guestSessionId) {
    const session = await this.getResource(
      `${this.state.mainURL}/guest_session/${guestSessionId}/rated/movies?api_key=${this.state.apiKey}&language=en-US&sort_by=created_at.asc`,
    )
    return session
  }
  async postRateStars(movieId, countStars) {
    const sId = localStorage.getItem('гость')
    const result = await fetch(
      `${this.state.mainURL}/movie/${movieId}/rating?&api_key=${this.state.apiKey}&guest_session_id=${sId}`,
      {
        method: 'POST',
        body: JSON.stringify({ value: countStars }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
    if (!result.ok) throw new Error('Error postRequest')
    return await result
  }
}
