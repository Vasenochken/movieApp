import { Pagination } from 'antd'
import { Component } from 'react'

export default class MyPagination extends Component {
  handleChange = (page) => {
    this.props.searchPageMovie(this.props.queryMovie, page)
  }
  render() {
    const { totalPage, page } = this.props
    return (
      <Pagination
        className="pagination"
        defaultCurrent={page}
        pageSize={20}
        total={totalPage}
        showSizeChanger={false}
        onChange={this.handleChange}
      />
    )
  }
}
