import React, { Component } from 'react'
import Spinner  from './Spinner.gif'

export class Load extends Component {
  render() {
    return (
      <div className="text-center">
        <img className="my-5" src={Spinner} alt="Loading..." />
      </div>
    )
  }
}

export default Load
