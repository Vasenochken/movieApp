import { Input } from 'antd'
import { Component } from 'react'
import { debounce } from 'lodash'

export default class SearchPanel extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
    }
  }

  handleChange = debounce((e) => {
    const query = e.target.value
    this.setState({ query })
    this.props.searchMovie(query)
  }, 300)

  render() {
    return (
      <Input
        className="search-panel"
        placeholder="Type to search..."
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}
