import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

const ScrapButton = ({ text, onScrapClick }) => (
  <Menu.Item floated='right'>
    <Button color='orange' onClick={onScrapClick}>
      {text}
    </Button>
  </Menu.Item>
)

export default ScrapButton
