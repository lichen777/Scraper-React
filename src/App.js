import React, { Component } from 'react'
import './App.css'
import { Menu, Container, Message } from 'semantic-ui-react'
import _ from 'lodash'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ScrapButton from './components/ScrapButton'
import HomeContent from './components/HomeContent'
import SavedContent from './components/SavedContent'
import Search from './components/Search'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      savedList: [],
      isLoading: false,
      results: [],
      value: "",
      message: true
    };
    this.handleScrap = this.handleScrap.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleScrap() {
    const url = "/scrape";
    fetch(url)
      .then(res => {
        if (res.ok) {
          this.setState({ message: false });
          setTimeout(() => this.setState({ message: true }), 3000);
          return this.getAllArticle();
        }
        console.error("something wrong");
      })
      .catch(err => console.error(err));
  }

  handleSaveClick(e) {
    const key = e.target.id;
    const url = "/articles/" + key;
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        this.getAllArticle();
        this.getAllSaved();
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleRemoveClick(e) {
    const key = e.target.id;
    const url = "/saved/" + key;
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        this.getAllArticle();
        this.getAllSaved();
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getAllArticle();
    this.getAllSaved();
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) => {
    const re = new RegExp(_.escapeRegExp(result.title), "i");
    const isMatch = result => re.test(result.title);
    this.setState({
      value: result.title,
      list: _.filter(this.state.list, isMatch)
    });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) {
        this.getAllArticle();
        return this.resetComponent();
      }

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.list, isMatch)
      });
    }, 500);
  };

  getAllArticle() {
    const url = "/articles";
    fetch(url)
      .then(res => res.json())
      .then(result => this.setState({ list: result }))
      .catch(error => {
        console.error(error);
      });
  }

  getAllSaved() {
    const url = "/saved";
    fetch(url)
      .then(res => res.json())
      .then(result => this.setState({ savedList: result }))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { list, savedList, isLoading, results, value, message } = this.state;

    return <Router>
        <div>
          <Menu fixed="top" inverted stackable borderless>
            <Container>
              <Menu.Item as="a" header id="logo">
                Scotch Scraper
              </Menu.Item>
              <Link className="item" to="/">
                {"Home"}
              </Link>
              <Link className="item" to="/favorite">
                {"Saved Articles"}
              </Link>
              <ScrapButton text="Scrap New Articles" onScrapClick={this.handleScrap} />
              <Menu.Item position="right">
                <Search loading={isLoading} onResultSelect={this.handleResultSelect} onSearchChange={this.handleSearchChange} results={results} value={value} />
              </Menu.Item>
            </Container>
          </Menu>
          <div>
            <Route exact path="/" render={() => <HomeContent list={list} onClick={e => this.handleSaveClick(e)} />} />
            <Route path="/favorite" render={() => <SavedContent list={savedList} onClick={e => this.handleRemoveClick(e)} />} />
          </div>
          <Menu fixed="bottom" compact secondary fluid widths={3}>
            <Menu.Item />
            <Menu.Item>
              <Message className="message" success hidden={message} content="Scrape is complete successfully" />
            </Menu.Item>
            <Menu.Item />
          </Menu>
        </div>
      </Router>;
  }
}

export default App
