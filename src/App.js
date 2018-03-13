import React, { Component } from 'react'
import './App.css'
import { Menu, Container, Button, Input } from 'semantic-ui-react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ScrapButton from './components/ScrapButton'
import Post from './components/Post'
import AutoSearch from './components/Search'
import SavedPost from './components/SavedPost'

const HomeContent = props => (
  <Container text style={{ marginTop: '5em' }}>
    {props.list.map(item => <div key={item._id}>
                              <Post _id={item._id} title={item.title} link={item.link} />
                            </div>
     )}
  </Container>
)

const SavedContent = props => (
  <Container text style={{ marginTop: '5em' }}>
    {props.list.map(item => <div key={item._id}>
                              <SavedPost _id={item._id} title={item.title} link={item.link} />
                            </div>
     )}
  </Container>
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      savedList: []
    }
    this.handleScrap = this.handleScrap.bind(this)
  }

  handleScrap () {
    console.log(this.state.list)
    fetch('/api/posts/scrap')
      .then(res => res.json())
      .then(result => this.setState({list: result}))
      .then(console.log(this.state.list))
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    const list = [{
      _id: 1,
      title: 'est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      link: 'google.com'
    }, {
      _id: 2,
      title: 'NO',
      link: 'facebook.com'
    }]

    const savedList = [{
      _id: 1,
      title: 'PPL',
      link: 'linkedin.com'
    }, {
      _id: 2,
      title: 'dfadf',
      link: 'github.com'
    }]

    return (
      <Router>
        <div>
          <Menu fixed='top' inverted stackable>
            <Container>
              <Menu.Item as='a' header>
                Scotch Scraper
              </Menu.Item>
              <Link className='item' to='/'> Home
              </Link>
              <Link className='item' to='/saved'> Saved Articles
              </Link>
              <ScrapButton text='Scrap New Articles' onScrapClick={this.handleScrap} />
              <Menu.Item position='right'>
                <Input type='text' placeholder='Search...' action>
                <input />
                <Button type='submit' icon='search'>
                </Button>
                </Input>
              </Menu.Item>
            </Container>
          </Menu>
          <div className='main'>
            <Route exact path='/' render={() => <HomeContent list={list} />} />
            <Route path='/saved' render={() => <SavedContent list={savedList} />} />
          </div>
          //<AutoSearch source={list} />
        </div>
      </Router>
    )
  }
}

export default App
