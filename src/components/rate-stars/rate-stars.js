import { Component } from 'react'
import { Rate } from 'antd'

import ServiceApi from '../../service/service'

export default class Stars extends Component {
  constructor() {
    super()
    this.api = new ServiceApi()
  }
  handleClickStars = (countStars) => {
    this.api.postRateStars(this.props.id, countStars)
  }
  render() {
    const { stars } = this.props
    return (
      <Rate
        className="rate"
        defaultValue={stars}
        count={10}
        onChange={this.handleClickStars}
      />
    )
  }
}
