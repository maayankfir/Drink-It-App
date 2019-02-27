import React, { Component } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import CocktailContainer from '../containers/CocktailContainer'
import HomePage from './HomePage'

class SidebarMenu extends Component {

  state = {
    visible: false,
    activeItem: 'home',
    menuVisible: false
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state
    const { activeItem } = this.state
    return (
      <div>
        <Button animated='vertical' disabled={visible} onClick={this.handleShowClick}>
          <Button.Content hidden>Menu</Button.Content>
          <Button.Content visible>
            <Icon name='sidebar' />
          </Button.Content>
        </Button>
       <Sidebar
         as={Menu}
         animation='overlay'
         icon='labeled'
         inverted
         onHide={this.handleSidebarHide}
         vertical
         visible={visible}
         width='thin'
       >
        <Menu.Item as= {Link} to='/home'
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as= {Link} to='/cocktails'
          name='cocktails'
          active={activeItem === 'cocktails'}
          onClick={this.handleItemClick}>
          <Icon name='glass martini' />
          Cocktails
        </Menu.Item>
        </Sidebar>
          <Sidebar.Pusher>
              <Header as='h3'>Welcome to Maayan's Cocktails App!
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SXbjJep1dgWzeD2UHAX80vCEGCEU4awG-WDAZlebB4VDg255Bw"/>
              </Header>
              <br></br>
          </Sidebar.Pusher>
      </div>
    )
  }
}

export default SidebarMenu
