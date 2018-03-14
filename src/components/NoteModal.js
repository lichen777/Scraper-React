import React from 'react'
import { Button, Modal, Form, TextArea } from 'semantic-ui-react'

const NoteModal = (props) => (
  <Modal trigger={props.trigger} size='small' open={props.open}>
    <Modal.Content>
      <h3>Your Note: </h3>
      <p>{props.body}</p>
      <Form>
        <TextArea id='newNote' placeholder='Tell us more' />
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={props.onClose}>
        Cancel
      </Button>
      <Button
        positive
        icon='checkmark'
        labelPosition='right'
        onClick={props.onSave}
        content='Save' />
    </Modal.Actions>
  </Modal>
)

export default NoteModal
