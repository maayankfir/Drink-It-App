import React from 'react'
import CocktailList from '../components/CocktailList'
import CocktailDisplay from '../components/CocktailDisplay'
import NewCocktailForm from '../components/NewCocktailForm'
import CocktailFilter from '../components/CocktailFilter'
import Favorites from '../components/Favorites'
import { Button, Header, Grid, Image, Segment } from 'semantic-ui-react'


class CocktailContainer extends React.Component{
  state = {
    allCocktails: [],
    clickedCocktail: null,
    searchInput: '',
    active: false,
    favorites: [],
    favoriteClick: false
  }

  componentDidMount = () => {
  this.fetchAllCocktails()
  this.fetchAllFavorites()
  }

  fetchAllCocktails = () => {
    fetch('http://localhost:3000/api/v1/cocktails/')
    .then(res => res.json())
    .then(cocktail => this.setState({
      allCocktails: cocktail
    }))
  }

  fetchAllFavorites = () => {
    fetch("http://localhost:3000/api/v1/favorites")
    .then(res => res.json())
    .then(data => {
      this.setState({
        favorites: data
      })
    })
  }

  handleCocktailClick = (cocktail) => {
    const url = 'http://localhost:3000/api/v1/cocktails/'
    fetch(url + cocktail.id)
    .then(res => res.json())
    .then(data => this.setState({
      clickedCocktail: data
    }))
  }

  handleSubmit = (e, obj) =>{
    // console.log(obj)
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/cocktails', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: obj.name,
        description: obj.description,
        instructions: obj.instructions,
      })
    })
    .then(res => res.json())
    .then(newCocktail => (this.handleIngredient(newCocktail, obj)))
  }

  handleIngredient = (newCocktail, obj) => {
    fetch('http://localhost:3000/api/v1/ingredients', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      name: obj.proportions[0].ingredient_name
      })
    })
    .then(res => res.json())
    .then(json => this.handleProportion(json, newCocktail, obj))
    }

  handleProportion = (ingredient, cocktail, obj) => {
    console.log(ingredient, cocktail, obj)
    fetch('http://localhost:3000/api/v1/proportions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        amount: obj.proportions[0].amount,
        cocktail_id: cocktail.id,
        ingredient_id: ingredient.id
      })
    }).then(res => res.json())
    .then(drink => this.setState({
      allCocktails: [...this.state.allCocktails, cocktail]
      })
    )
  }

  handleSearchChange = (e) => {
      e.preventDefault()
      this.setState({
      searchInput: e.target.value
    })
  }

  handleRemove= (cocktailObj) => {
    // console.log(cocktailObj);
    let cocktailsArr = this.state.allCocktails.filter(cocktail => cocktail !== cocktailObj)
    this.setState({
      allCocktails: cocktailsArr,
      searchInput: ''
    })
    this.removeCocktail(cocktailObj.id)
  }

  removeCocktail = (cocktailObjId) => {
    fetch(`http://localhost:3000/api/v1/cocktails/${cocktailObjId}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(cocktails =>this.setState({
      allCocktails: cocktails
      })
    )
  }

  handleClick = () => {
   this.setState({
      active: !this.state.active
    })
  }

  handleFavoriteClick = () => {
   this.setState({
      favoriteClick: !this.state.favoriteClick
    })
  }

    mappedFavorites = () => {
      let newArr, favs, myCocktailIds, filtered;
      fetch("http://localhost:3000/api/v1/favorites")
      .then(res => res.json())
      .then(data => {
        this.setState({
          favorites: data
        })
      })
      newArr = [...this.state.allCocktails]
      favs = this.state.favorites.filter(favorite => favorite.user_id === 1)

      myCocktailIds = favs.map(fav => fav.cocktail_id)
      filtered = newArr.filter(function(item) {
        return myCocktailIds.indexOf(item.id) !== -1
      })
      return filtered.map(cocktail => { return <Favorites key={cocktail.id} cocktail={cocktail}/>})
    }


  render(){

    const filterArr = this.state.allCocktails.filter(cocktail => {
      return cocktail.name.toLowerCase().includes(this.state.searchInput)
    })

    let cocktailArr = filterArr.map(cocktail => {
      return <CocktailList key={cocktail.id}
       cocktail={cocktail}
       click={this.handleCocktailClick} handleRemove={this.handleRemove}/>
    })

    return(

      <div>
       <Grid columns={3} >
          <Grid.Column >
            <CocktailFilter searchInput={this.state.searchInput} handleSearchChange={this.handleSearchChange}/>
            <Header as='h3' block>
               Cocktails List
            </Header>
          {cocktailArr}
        </Grid.Column>
        <Grid.Column >
        <br></br><br></br><br></br><br></br>
          {this.state.clickedCocktail ? <CocktailDisplay cocktail={this.state.clickedCocktail} /> : ""
        }
        </Grid.Column>
        <Grid.Column >

        <Button toggle active={this.state.active} onClick={this.handleClick}>
          New Cocktail Form!
        </Button>

        <Button toggle active={this.state.favoriteClick} onClick={this.handleFavoriteClick}>
          Favorites!
        </Button>

        {this.state.active ? <NewCocktailForm submit={this.handleSubmit} /> : ''}
        {this.state.favoriteClick ? this.mappedFavorites() : '' }
         </Grid.Column>
        </Grid>

      </div>
    )
  }
}

export default CocktailContainer
