import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'

class Post extends Component {
  handleSaveClick (key) {
    console.log(key)
    fetch('/api/posts/scrap')
      .then(res => res.json())
      .then(result => this.setState({ list: result }))
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    return (
      <div id={this.props._id}>
        <Segment clearing>
          <div>
            <h5><a href={this.props.link}>{this.props.title}</a> <Button
                                                                           compact
                                                                           floated='right'
                                                                           color={this.props.saved ? 'violet' : 'green'}
                                                                           onClick={() => this.handleSaveClick(this.props._id)}> {this.props.saved ? 'Saved' : 'Save'} </Button></h5>
          </div>
        </Segment>
        <p></p>
      </div>
    )
  }
}

export default Post
