import React, { Component } from 'react';
import style from './index.scss';
import 'react-virtualized/styles.css'
import List from 'react-virtualized/dist/commonjs/List'

// List data as an array of strings
const list = new Array(10000).fill('Brian Vaughn')

// {
//   key,         // Unique key within array of rows
//   index,       // Index of row within collection
//   isScrolling, // The List is currently being scrolled
//   isVisible,   // This row is visible within the List (eg it is not an overscanned row)
//   style        // Style object to be applied to row (to position it)
// }
const rowRenderer = (props) => {
  console.log(props)
  return (
    <div key={props.key} style={props.style} className="list-row">
      {list[props.index]}
    </div>
  )
}

class ReactList extends Component {
  render() {
    return (
      <List
        width={300}
        height={100}
        rowCount={list.length}
        rowHeight={20}
        rowRenderer={rowRenderer}
      />
    )
  }
}

export default ReactList;
