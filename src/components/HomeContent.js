import React from 'react'
import Post from './Post'
import { Container } from 'semantic-ui-react'

const HomeContent = props => (
  <Container text className='main'>
    {props.list.map(item => <div key={item._id}>
                              <Post
                                _id={item._id}
                                title={item.title}
                                link={item.link}
                                saved={item.saved} />
                            </div>
     )}
  </Container>
)

export default HomeContent
