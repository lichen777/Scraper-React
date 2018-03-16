import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'

class Post extends Component {
  render () {
    return <div>
        <Segment clearing>
          <div>
            <h5>
              <a href={this.props.link} target="_blank">
                {this.props.title}
              </a>
              <p />
              <Button id={this.props._id} compact floated="right" color={this.props.saved ? "violet" : "green"} onClick={this.props.onClick}>
                {this.props.saved ? "Saved" : "Save"}
              </Button>
            </h5>
          </div>
        </Segment>
        <p />
      </div>
  }
}

export default Post
