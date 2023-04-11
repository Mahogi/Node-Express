import React, {useRef} from 'react';
//import {Box} from '@mui/material';

const AddProduct = ({create}) => {
  const titleRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();


  const createProduct = () => {
    const product = {
      title: titleRef.current.value,
      image: imageRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
    }
    create(product);
    console.log(product);
    // fetch('http://localhost:3400/products', {
    //   method: 'POST',
    //   body: JSON.stringify(product),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => {
    //   if (!response.ok) {
    //     throw new Error('Response was not ok');
    //   }
    //   return response.json();
    // }).then(data => {
    //   console.log(data);
    //   set(data);
    //   console.log('Data successfully set');
    // }).catch(err => {
    //   console.log(err, ' Error while creating product');
    // })
  }

  return (
    <div>
      <label htmlFor="title">Title:</label><br/>
      <input type="text" id="title" name="title" ref={titleRef}/><br/>
      <label htmlFor="image">Image:</label><br/>
      <input type="text" id="image" name="image" ref={imageRef}/><br/>
      <label htmlFor="description">Description:</label><br/>
      <input type="text" id="description" name="description" ref={descriptionRef}/><br/>
      <label htmlFor="price">Price:</label><br/>
      <input type="text" id="price" name="price" ref={priceRef}/><br/>
      <input type="submit" value="Submit" onClick={createProduct}/>
    </div>
  );
}

export default AddProduct;