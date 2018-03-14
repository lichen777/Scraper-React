import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Button, Input } from 'semantic-ui-react'

export default class AutoSearch extends Component {
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(this.props.source, isMatch),
            })
        }, 500)
    }

    render() {
        const { isLoading, value, results } = this.state

        return (
          <Menu.Item position='right'>
            <Input type='text' placeholder='Search...' action>
            <input value={value} />
            <Button type='submit' icon='search'>
            </Button>
            </Input>
          </Menu.Item>
        )
    }
}

<Search
    loading={isLoading}
    onResultSelect={this.handleResultSelect}
    onSearchChange={this.handleSearchChange}
    results={results}
    value={value}
    {...this.props}
/>
