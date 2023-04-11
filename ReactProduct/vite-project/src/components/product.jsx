import React from 'react';
import './product.css';

const Product = ({item, remove}) => {

  return (
    <div className="productCard">
      <div>{item.title}</div>
      <img src={item.image} alt=""/>
      <div>{item.description}</div>
      <div>{item.price + "€"}</div>
      <button onClick={() => remove(item.id)}>Delete</button>
    </div>
  );
};

export default Product;