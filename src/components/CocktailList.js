import React from 'react'
import { Popup, Button, Segment, List, Icon } from 'semantic-ui-react'


 class CocktailList extends React.Component{

  render(){

    return(
      <div>
        <Segment.Group >
        <List animated divided verticalAlign='middle' size='large' >
          <List.Item >
          <List.Content floated='right'>
          <Button.Group>
          <Button positive onClick={()=> {this.props.click(this.props.cocktail)}}>Info</Button>
            <Button.Or/>
          <Popup
            trigger={<Button color='red' ><Icon name='trash alternate'/></Button>}
            content={<Button color='grey' content='Confirm delete' onClick={() => {this.props.handleRemove(this.props.cocktail)}}/>}
            on='click'
            position='top right'
            />

          </Button.Group>

          </List.Content>
            <List.Content floated='left'>
              {this.props.cocktail.name}
            </List.Content>
          </List.Item>
          </List>
        </Segment.Group>
      </div>
    )
  }

}

export default CocktailList
