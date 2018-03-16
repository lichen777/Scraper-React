import React, { Component } from "react";
import { Segment, Button } from "semantic-ui-react";
import NoteModal from "./NoteModal";
import NoteButton from "./NoteButton";

class SavedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "none",
      open: false,
      createTime: ""
    };
  }

  handleNoteClick(key) {
    this.setState({ open: true });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://scotch-scraper.herokuapp.com/note/" + key;
    fetch(proxyurl + url)
      .then(res => res.json())
      .then(result => {
        if (result.note) {
          this.setState({
            body: result.note.body,
            createTime: new Date(result.note.createAt)
          });
        } else {
          this.setState({ body: "No Note added yet" });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSaveClick(key) {
    const data = {
      body: document.getElementById("newNote").value.trim()
    };
    const searchParams = Object.keys(data)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
      })
      .join("&");
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://scotch-scraper.herokuapp.com/note/" + key;

    this.postApiRequest(proxyurl + url, "POST", searchParams).then(() => {
      this.setState({ open: false });
    });
  }

  handleCloseClick() {
    this.setState({ open: false });
  }

  postApiRequest(url, method, data) {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: data
    })
      .then(res => res.json())
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { body, open, createTime } = this.state;

    return <div id={this.props._id}>
        <Segment clearing>
          <div>
            <h5>
              <a href={this.props.link} target="_blank">
                {this.props.title}
              </a> <p /> 
              <NoteModal createTime={`${createTime}`} body={body} open={open} onClose={() => this.handleCloseClick()} onSave={() => this.handleSaveClick(this.props._id)} trigger={<NoteButton onClick={() => this.handleNoteClick(this.props._id)} />} /> 
              <Button id={this.props._id} compact floated="right" color="red" onClick={this.props.onClick}>
                {"Remove"}
              </Button>
            </h5>
          </div>
        </Segment>
        <p />
      </div>;
  }
}

export default SavedPost;
