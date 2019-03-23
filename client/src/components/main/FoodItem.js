import React from 'react'

export default function FoodItem({item}) {
  console.log(item)
  let { brand_name, item_name, nf_serving_size_qty, nf_serving_size_unit} = item.fields;

  return (
    <tr>
      <th>{brand_name}</th>
      <th>{item_name}</th>
      <th>{nf_serving_size_qty} {nf_serving_size_unit}</th>
    </tr>
  )
}
