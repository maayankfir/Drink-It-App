import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'

import cocktailsPhoto from './cocktails.jpg'

class HomePage extends Component {

  render() {
    return (
      <div>
        <br></br>
        <Image src={cocktailsPhoto} alt="" fluid/>
      </div>
    );
  }

}

export default HomePage;
