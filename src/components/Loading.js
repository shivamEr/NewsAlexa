import React, { Component } from 'react'
import loading from '../Spinner-2.gif'

export default class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="" />
      </div>
    )
  }
}
