import React, { Component } from 'react'

export default class FoodItem extends Component {
  render() {
    let { brand_name, item_name, item_id, nf_calories } = this.props.item.fields;

    return (

      <tr onClick={() => this.props.selectFood(item_id)}>
        <th>{brand_name}</th>
        <th>{item_name}</th>
        <th>{nf_calories}</th>
      </tr>

    );
  }
}
