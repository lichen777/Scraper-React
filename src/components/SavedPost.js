import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'

class SavedPost extends Component {

  handleNoteClick (key) {
    console.log(key)
    fetch('/api/posts/scrap')
      .then(res => res.json())
      .then(result => this.setState({ list: result }))
      .catch((error) => {
        console.error(error)
      })
  }

  handleRemoveClick (key) {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://scotch-scraper.herokuapp.com/saved/' + key
    fetch(proxyurl + url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => window.location.reload())
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    return (
      <div id={this.props._id}>
        <Segment clearing>
          <div>
            <h5>
              <a href={this.props.link} target="_blank">{this.props.title}</a>
              <p></p>
              <Button compact floated='right' color='purple' onClick={() => this.handleNoteClick(this.props._id)}> Add Note </Button>
              <Button compact floated='right' color='red' onClick={() => this.handleRemoveClick(this.props._id)}> Remove </Button>
            </h5>
          </div>
        </Segment>
        <p></p>
      </div>
    )
  }
}

export default SavedPost
