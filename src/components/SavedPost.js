import React, { Component } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import NoteModal from './NoteModal'
import NoteButton from './NoteButton'

class SavedPost extends Component {
  constructor (props) {
    super(props)
    this.state = {
      body: 'note history',
      open: false
    }
  }

  handleNoteClick (key) {
    this.setState({open: true})
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://scotch-scraper.herokuapp.com/note/' + key
    fetch(proxyurl + url)
      .then(res => res.json())
      .then(result => {
        if (result.note) {
          this.setState({ body: result.note.body })
        } else {
          this.setState({ body: 'No Note added yet'})
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  handleSaveClick (key) {
    const data = {
      body: document.getElementById('newNote').value.trim()
    }
    const searchParams = Object.keys(data).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://scotch-scraper.herokuapp.com/note/' + key

    this.postApiRequest(proxyurl + url, "POST", searchParams)
      .then(() => {
        this.setState({open: false})
      })
  }

  handleCloseClick () {
    this.setState({open: false})
  }

  postApiRequest (url, method, data) {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: data
    })
      .then(res => res.json())
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
    const {body, open} = this.state

    return (
      <div id={this.props._id}>
        <Segment clearing>
          <div>
            <h5><a href={this.props.link} target='_blank'>{this.props.title}</a> <p></p> <NoteModal body={body} open={open} onClose={() => this.handleCloseClick()} onSave={() => this.handleSaveClick(this.props._id)} trigger={<NoteButton onClick={() => this.handleNoteClick(this.props._id)} />} /> <Button
                                                                                                                                                                                                    compact
                                                                                                                                                                                                    floated='right'
                                                                                                                                                                                                    color='red'
                                                                                                                                                                                                    onClick={() => this.handleRemoveClick(this.props._id)}> Remove </Button></h5>
          </div>
        </Segment>
        <p></p>
      </div>
    )
  }
}

export default SavedPost
