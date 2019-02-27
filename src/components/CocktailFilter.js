import React from 'react';
import {Segment, Loader, Popup, Input} from 'semantic-ui-react'

const Filter = (props) => {

  return (
    <div>

    <Popup inverted 
      trigger={<Input width={5} icon='search' placeholder='Search...' onChange={(e) => props.handleSearchChange(e)}
      value={props.searchInput} />}
      header='Cocktail Search'
      content='You may search by cocktail name'
      on='focus'
      />

    </div>
  )
}

export default Filter;
