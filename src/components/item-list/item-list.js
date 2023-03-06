import { format } from 'date-fns'
import { Component } from 'react'

import './item-list.css'

export default class ItemList extends Component {
  render() {
    const { title, dateRelease, description } = this.props
    let string = description
    const formatData = (dateRelease) => {
      if (!dateRelease) return null
      return format(new Date(dateRelease), 'MMMM d, yyyy')
    }
    if (description.length > 204) {
      string = string.slice(0, string.indexOf(' ', 150))
      string += ' ...'
    }
    return (
      <li className="item-list">
        <img className="picture"></img>
        <div className="info">
          <h5 className="title">{title}</h5>
          <p className="data">{formatData(dateRelease)}</p>
          <div className="genre-films">
            <div className="genre-box">
              <p className="genre">Action</p>
            </div>
            <div className="genre-box">
              <p className="genre">Drama</p>
            </div>
          </div>
          <p className="description">{string}</p>
        </div>
      </li>
    )
  }
}
