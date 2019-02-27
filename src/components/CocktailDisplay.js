import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import cocktailsPhoto from './cocktails-promo.jpg'

 class CocktailDisplay extends React.Component{

   addFavorite = () => {
      fetch('http://localhost:3000/api/v1/favorites', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: 1, cocktail_id: this.props.cocktail.id})
      })
    }
      render(){
    let ingredient = this.props.cocktail.proportions.map(i => <p key={i.id}>-{i.amount} {i.ingredient_name}</p>)
    // console.log(this.props.cocktail)
    return(
    <div>
        <Card size='huge' centered>
          <br></br>
          <Image src={cocktailsPhoto} />
          <Card.Content>
            <Card.Header>{this.props.cocktail.name}</Card.Header>
            <Card.Description>{this.props.cocktail.description}</Card.Description>
            <Card.Description>{this.props.cocktail.instructions}</Card.Description>
              <br></br>
            <Card.Header>Ingredients</Card.Header>
            <Card.Description>{ingredient}</Card.Description>
              <br></br>
              <Button icon="like" onClick={this.addFavorite}>

               </Button>
          </Card.Content>

        </Card>
      </div>
    )
  }
}

export default CocktailDisplay
