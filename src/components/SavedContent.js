import React from 'react'
import SavedPost from './SavedPost'
import { Container } from 'semantic-ui-react'

const SavedContent = props => (
  <Container text style={{ marginTop: '5em' }}>
    {props.list.map(item => <div key={item._id}>
                              <SavedPost _id={item._id} title={item.title} link={item.link} />
                            </div>
     )}
  </Container>
)

export default SavedContent
