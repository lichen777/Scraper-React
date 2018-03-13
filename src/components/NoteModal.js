import React, { Component } from 'react'
import { Button, Modal, Form, TextArea } from 'semantic-ui-react'

class NoteModal extends Component {
  state = { open: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size } = this.state

    return (
      <div>
        <Button onClick={this.show('small')}>Small</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>
            Note
          </Modal.Header>
          <Modal.Content>
            <Form>
              <TextArea placeholder='Tell us more' />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>
              Cancel
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Save' />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default NoteModal
