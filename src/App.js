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
    {props.list.map(item =>
      <div key={item._id}>
        <Post _id={item._id} title={item.title} link={item.link} saved={item.saved} />
      </div>
     )}
  </Container>
)

const SavedContent = props => (
  <Container text style={{ marginTop: '5em' }}>
    {props.list.map(item =>
      <div key={item._id}>
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
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const url = 'https://scotch-scraper.herokuapp.com/scrape'
    fetch(proxyurl + url)
      .then(res => console.log(res.status))
      .then(result => window.location.reload())
      .catch((error) => {
        console.error(error)
      })
  }

  componentDidMount () {
    this.getAllArticle()
    this.getAllSaved(() => console.log(this.state.savedList))
  }

  getAllArticle() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://scotch-scraper.herokuapp.com/articles'
    fetch(proxyurl + url)
      .then(res => res.json())
      .then(result => this.setState({list: result}))
      .catch((error) => {
        console.error(error)
      })
  }

  getAllSaved(cb) {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://scotch-scraper.herokuapp.com/saved'
    fetch(proxyurl + url)
      .then(res => res.json())
      .then(result => this.setState({savedList: result}))
      .catch((error) => {
        console.error(error)
      })
      .then(cb)
  }

  render () {
    const {list, savedList} = this.state

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
        </div>
      </Router>
    )
  }
}

export default App
