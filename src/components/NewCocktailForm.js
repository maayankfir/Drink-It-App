import React from 'react'
import { Input, TextArea, Divider, Button, Form, Segment } from 'semantic-ui-react'

class NewCocktailForm extends React.Component{

  state={
    name: '',
    description: '',
    instructions: '',
    proportions: [
      {
        ingredient_name: '',
        amount: ''
      }
    ]
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value}
    )}

  propChange = (e, idx) => {
    const newDrink = this.state.proportions.map((prop, propIdx) =>{
      if (idx !== propIdx){
        return prop
      }
      return {...prop, [e.target.name]: e.target.value}
    })
    this.setState({proportions: newDrink})
  }

  clickAddHandler = (e) => {
    e.preventDefault()
    this.setState({
      proportions: [...this.state.proportions, {ingredient_name: "", amount: ""}]
    })
  }

  clickRemoveHandler = (e, idx) => {
    this.setState({
      proportions: this.state.proportions.filter((s, sidx) => idx !== sidx)
    })
  }

    addProportion = () => {
      return this.state.proportions.map((proportions, idx) => {
        return (
          <div key={idx}>
            <Form.Input fluid label='Ingredient name'
              data-id={idx}
              name='ingredient_name'
              placeholder="Ingredient Name"
              value={this.state.proportions[idx].ingredient_name}
              onChange={(e) =>this.propChange(e, idx)} />
            <Form.Input label='Quantity'
              placeholder="Amount"
              data-id={idx}
              name="amount"
              value={this.state.proportions[idx].amount}
              onChange={(e) => this.propChange(e, idx)}
               />
          </div>
        )
      })
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.submit(e, this.state)
      this.setState({
        name: '',
        description: '',
        instructions: '',
        proportions: [
          {
            ingredient_name: '',
            amount: ''
          }
        ]
      })
    }

  render(){
    return(
        <div>

          <Divider horizontal >
             Create A Cocktail
          </Divider>
          <Form onSubmit={(e) => this.handleSubmit(e)} >
              <Form.Input fluid label='Cocktail name'
               name="name"
               value={this.state.name}
               onChange={this.inputChange}/>
             <Form.TextArea label='Description'
              placeholder='Tell us more about your cocktail...'
              name="description"
              value={this.state.description}
              onChange={this.inputChange}/>
             <Form.TextArea label='Instructions'
              placeholder='How to make it? '
              value={this.state.instructions}
              name="instructions"
              onChange={this.inputChange}/>
             <Divider horizontal >
                Proportions
              </Divider>
             <Button circular icon='add circle' onClick={(e) => this.clickAddHandler(e)}/>
             <Button circular icon='minus square outline' onClick={(e) => this.clickRemoveHandler(e)}/>
              {this.addProportion()}
              <br></br>
            <Button type='submit'>Create New Cocktail</Button>
          </Form>

        </div>
    )
  }
}

export default NewCocktailForm
