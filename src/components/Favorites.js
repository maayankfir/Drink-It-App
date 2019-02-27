import React, { Component } from 'react';
import CocktailDisplay from './CocktailDisplay'
import { Button,Icon, List } from 'semantic-ui-react'

class Favorites extends Component {


  // handleClick = () => {
  //   let favoriteId = this.props.favId[0]
  //    fetch(`http://localhost:3000/api/v1/favorites/${favoriteId}`, {
  //      method: "DELETE"
  //    })
  //  }

  render() {
    // console.log(this.props.favId);
    return (
        <List divided verticalAlign='middle'>
        <List.Item>
          <List.Content floated='right'>
            <Button>

             <Icon name='trash alternate'/></Button>
          </List.Content>
          <List.Content floated='left'>{this.props.cocktail.name}</List.Content>
        </List.Item>
        </List>

    );
  }

}

export default Favorites;
