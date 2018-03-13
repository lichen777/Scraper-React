import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'

class Post extends Component {

  handleSaveClick (key) {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://scotch-scraper.herokuapp.com/articles/' + key
    fetch(proxyurl + url, {
      method: 'POST',
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
              <Button
                 compact
                 floated='right'
                 color={this.props.saved ? 'violet' : 'green'}
                 onClick={() => this.handleSaveClick(this.props._id)}> {this.props.saved ? 'Saved' : 'Save'}
               </Button>
            </h5>
          </div>
        </Segment>
        <p></p>
      </div>
    )
  }
}

export default Post
