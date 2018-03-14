import React from 'react'
import { Button } from 'semantic-ui-react'

const NoteButton = (props) => (
  <Button
    compact
    floated='right'
    color='purple'
    onClick={props.onClick}>
    Add Note
  </Button>
)

export default NoteButton
