import React, { Component } from 'react'
import Food from './Food'

export default class Main extends Component {
  constructor(props){
    super()
    this.state = {
      phrase:"",
      location:{}

    }
  }
  render() {
    return (
      <div>
        This is going to be the main part of the whole app
        <div>
          <Food />
        </div>
      </div>
    )
  }
}
