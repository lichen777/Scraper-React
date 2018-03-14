import React from 'react'
import { Search } from 'semantic-ui-react'

const AutoSearch = props => (
  <Search
      loading={props.isLoading}
      onResultSelect={props.onResultSelect}
      onSearchChange={props.onSearchChange}
      results={props.results}
      value={props.value}
      {...this.props}
  />
)

export default AutoSearch
